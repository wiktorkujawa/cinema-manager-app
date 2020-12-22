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
    primary: '#FF3333',
    secondary: '#990000',
  },
  {
    primary: '#FF9933',
    secondary: '#994C00',
  },
  {
    primary: '#FFFF33',
    secondary: '#999900',
  },
  {
    primary: '#33FF33',
    secondary: '#009900',
  },
  {
    primary: '#33FFFF',
    secondary: '#009999',
  },
  {
    primary: '#3333FF',
    secondary: '#000099',
  },
  {
    primary: '#9933FF',
    secondary: '#4C0099',
  },
  {
    primary: '#FF33FF',
    secondary: '#990099',
  },
  {
    primary: '#FF3399',
    secondary: '#99004C',
  },
  {
    primary: '#A0A0A0',
    secondary: '#404040',
  }
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
            color: colors[index%10],
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
      }).subscribe( async (data:any) => {

        
        const colorArray = await this.hallService.getHalls().toPromise().then( 
          (data) => { 
             return data;
          });

        let colorIndex:any;
        colorArray.some( (el:any, index: number) =>{
          return el.name==hall_name? colorIndex = index: null 
        })

        const added_event = {
          meta:{
            hall_name: hall_name,
            showing_id: data._id,
          },
          title: data.movie,
          start: parseISO(data.start),
          end: parseISO(data.end),
          color: colors[colorIndex%10],
          draggable: true,
          resizable: {
            beforeStart: true,
            afterEnd: true,
          },
        }
        this.AllEvents = [
          ...this.AllEvents,
          added_event
        ]

        this.events = [
          ...this.events,
          added_event
        ]

        let formatted_date =this.datepipe.transform(this.addMovietoHall.start, 'medium');

        

        const message = `Movie ${this.addMovietoHall.title} added to ${this.addMovietoHall.hall_name} on ${formatted_date}`
        this.handleEvent('Event Added', message);
      }, (error) =>{
        this.handleEvent("Event can't be added", error.error.msg);
      }
      
      );
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
      this.handleEvent('Event deleted', msg.msg);
      })
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
