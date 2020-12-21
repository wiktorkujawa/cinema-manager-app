import { 
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ChangeDetectionStrategy
} from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours,
  parseISO
} from 'date-fns';

import {
  CalendarEvent,
  CalendarEventAction,
  CalendarEventTimesChangedEvent,
  CalendarView,
} from 'angular-calendar';
import { HallService } from 'src/app/services/hall.service';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MovieService } from 'src/app/services/movie.service';
import { DatePipe } from '@angular/common'

const colors: any = [
  {
    primary: '#ad2121',
    secondary: '#FAE3E3',
  },
  {
    primary: '#1e90ff',
    secondary: '#D1E8FF',
  },
  {
    primary: '#e3bc08',
    secondary: '#FDF1BA',
  },
  {
    primary: '#9BC4E5',
    secondary: '#310106',
  },
  {
    primary: '#04640D',
    secondary: '#FEFB0A',
  },
  {
    primary: '#FB5514',
    secondary: '#E115C0',
  },
  {
    primary: '#00587F',
    secondary: '#0BC582',
  },
  {
    primary: '#FEB8C8',
    secondary: '#9E8317',
  },
  {
    primary: '#01190F',
    secondary: '#847D81',
  },
  {
    primary: '#58018B',
    secondary: '#B70639',
  },
  {
    primary: '#703B01',
    secondary: '#F7F1DF',
  },
  {
    primary: '#118B8A',
    secondary: '#4AFEFA',
  },
  {
    primary: '#FCB164',
    secondary: '#796EE6',
  },
  {
    primary: '#000D2C',
    secondary: '#53495F',
  },
  {
    primary: '#F95475',
    secondary: '#61FC03',
  },
  {
    primary: '#5D9608',
    secondary: '#DE98FD',
  },
  {
    primary: '#98A088',
    secondary: '#4F584E',
  },
  {
    primary: '#248AD0',
    secondary: '#5C5300',
  },
  {
    primary: '#9F6551',
    secondary: '#BCFEC6',
  },

];

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})



export class HomeComponent implements OnInit {
  @ViewChild('modalContent', { static: true })
  modalContent: TemplateRef<any> | undefined;

  view: CalendarView = CalendarView.Month;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  modalData!: {
    action: string;
    event: CalendarEvent;
  };

  // colors: any;

  addMovietoHall = {
    hall_name:'',
    title:'',
    start:''
  };

  selectedHall:any = {
    hall_name: []
  }
  
  selectHallForm = new FormGroup({});


  selectFields: any = [
    {
      key: 'hall_name',
      type: 'select',
      templateOptions: {
        change: () => {
          this.events=[];
          this.selectedHall.hall_name.map( (selected:any) =>{
            this.AllEvents.map( event =>{
              if(event.meta.hall_name==selected){
                this.events.push(event);
              }
            })
          })
        },
        label: 'Hall',
        placeholder: 'Choose hall',
        required: true,
        options: this.hallService.getHalls(),
        valueProp: 'name',
        labelProp: 'name',
        multiple: true,
        appearance: 'outline'
      }
    }
  ];

  
  form = new FormGroup({});
fields: FormlyFieldConfig[] = [
    {
      key: 'hall_name',
      type: 'select',
      templateOptions: {
        label: 'Hall',
        placeholder: 'Choose hall',
        required: true,
        options: this.hallService.getHalls(),
        valueProp: 'name',
        labelProp: 'name',
        appearance: 'outline'
      }
    },
    {
      key: 'title',
      type: 'select',
      templateOptions: {
        label: 'Movie',
        placeholder: 'Choose movie',
        required: true,
        options: this.movieService.getMovies(),
        valueProp: 'title',
        labelProp: 'title',
        appearance: 'outline'
      }
    },
    {
      key: 'start',
      type: 'datepicker',
      templateOptions: {
        label: 'Date',
        placeholder: 'Choose start date',
        required: true,
        appearance: 'outline'
      }
    }
  ];

  actions: CalendarEventAction[] = [
    {
      label: '<i class="material-icons mat-icon">edit</i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        
        this.handleEvent('Edited', event);
      },
    },
    {
      label: '<i class="material-icons mat-icon">delete</i>',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
    
        this.hallService.removeShowing(event.meta.hall_name, event.meta.showing_id).subscribe((msg: any) =>{

          this.AllEvents = this.AllEvents.filter( delEvent => delEvent.meta.showing_id !== event.meta.showing_id);
          this.events=[];
          this.selectedHall.hall_name.map( (selected:any) =>{
            this.AllEvents.map( event =>{
              if(event.meta.hall_name==selected){
                this.events.push(event);
              }
            })
          })
          this.handleEvent('Deleted', msg.msg);
        });
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  
  AllEvents: CalendarEvent[] = [];
  events: CalendarEvent[] = [];

  activeDayIsOpen: boolean = true;

  constructor( private hallService: HallService,
    private movieService: MovieService,
    private modal: NgbModal,
    public datepipe: DatePipe) {}

  ngOnInit(): void {

    this.hallService.getHalls().subscribe( (halls:any) => {
      halls.map( ({ name, taken_sessions}:any, index: number) =>{
        this.selectedHall.hall_name.push(name);
        taken_sessions.forEach( (showing:any) => {
          this.AllEvents.push({
            meta:{
              hall_name: name, 
              showing_id: showing._id
            },
            title: showing.movie,
            actions: this.actions,
            start: parseISO(showing.start),
            end: parseISO(showing.end),
            color: colors[index%19],
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true
            }
          )
        })
      })
      this.events = this.AllEvents;
    })
  }
  
  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
      }
      this.viewDate = date;
    }
  }

  eventClicked({ event }: { event: CalendarEvent }): void {

    let start =this.datepipe.transform(event.start, 'medium');
    let end =this.datepipe.transform(event.end, 'medium');

    const description = `<div class="table-responsive">
    <table class="table table-bordered">
      <thead>
        <tr>
          <th>Title</th>
          <th>Location</th>
          <th>Starts at</th>
          <th>Ends at</th>
        </tr>
      </thead>
  
      <tbody>
      <tr>

        <td>
          ${event.title}
        </td>
        <td>
          ${event.meta.hall_name}
        </td>
        <td>
          ${start}
        </td>
        <td>
          ${end}
        </td>
        </tr>
        </tbody>
      </table>
    </div>
      `

    this.handleEvent('Event summary', description);
  }

  eventTimesChanged({
    event,
    newStart,
    newEnd,
  }: CalendarEventTimesChangedEvent): void {
    this.events = this.events.map((iEvent) => {
      if (iEvent === event) {
        console.log(event);
      console.log(iEvent);
      
        return {
          ...event,
          start: newStart,
          end: newEnd,
        };
      }
      return iEvent;
    });
    this.handleEvent('Dropped or resized', event);
  }

  handleEvent(action: string, event: any): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg', backdrop : 'static',
    keyboard : false, centered: true });
  }

  addEvent(): void {

    const { hall_name, title, start } = this.addMovietoHall;
    
    this.movieService.getMovie(title).subscribe( (movies: any) => {
  
      this.hallService.addShowingToHall(hall_name, {
        'movie': movies.title,
        'start': start,
        'end': new Date(Date.parse(start) + movies.duration*60000)
      }).subscribe( (data:any) => {
        this.events = [
          ...this.events,
          {
            meta:{
              hall_name: hall_name,
              showing_id: data._id,
            },
            title: data.movie,
            start: parseISO(data.start),
            end: parseISO(data.end),
            color: colors[0],
            draggable: true,
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
          },
        ]

        let formatted_date =this.datepipe.transform(this.addMovietoHall.start, 'medium');

        

        const message = `Movie ${this.addMovietoHall.title} added to ${this.addMovietoHall.hall_name} on ${formatted_date}`
        this.handleEvent('Event Added', message);
      }, (error) =>{
        this.handleEvent("Event can't be added", error.error.msg);
      }
      
      );
      // this.handleEvent('Event Added', this.addMovietoHall);
  
  });

  };

  deleteEvent( eventToDelete: CalendarEvent ) {

    this.hallService.removeShowing(eventToDelete.meta.hall_name, eventToDelete.meta.showing_id).subscribe( (msg: any) =>{
      this.AllEvents = this.AllEvents.filter( event => event.meta.showing_id !== eventToDelete.meta.showing_id);
      this.events=[];
      this.selectedHall.hall_name.map( (selected:any) =>{
        this.AllEvents.map( event =>{
          if(event.meta.hall_name==selected){
            this.events.push(event);
          }
        })
      })
      console.log(msg);
      this.handleEvent('Event deleted', msg.msg);
      })
      // this.handleEvent('Event deleted', eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
