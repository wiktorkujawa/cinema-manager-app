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
import { FormControl, FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MovieService } from 'src/app/services/movie.service';

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


  addMovietoHall = {
    hall_id:'',
    movie_id:'',
    start:''
  };

  select: any;
  halls: any = [];
  selectHall = new FormGroup({});

  selectFields: FormlyFieldConfig[] 

  lastChange: any;
  onChange(){
    console.log("Change occured!")

    if(this.selectHall.value.hall_id && this.events==this.lastChange){
      this.events=[];
      this.selectHall.value.hall_id.map( (selected:any) =>{
        this.AllEvents.map( event =>{
          if(event.hall_id==selected){
            this.events.push(event);
          }
        })
      })
    }

    this.lastChange = this.events;
  }

  
  form = new FormGroup({});
fields: FormlyFieldConfig[] = [
    {
      key: 'hall_id',
      type: 'select',
      templateOptions: {
        label: 'Hall',
        placeholder: 'Choose hall',
        required: true,
        options: this.hallService.getHalls(),
        valueProp: '_id',
        labelProp: 'name',
        appearance: 'outline'
      }
    },
    {
      key: 'movie_id',
      type: 'select',
      templateOptions: {
        label: 'Movie',
        placeholder: 'Choose movie',
        required: true,
        options: this.movieService.getMovies(),
        valueProp: '_id',
        labelProp: 'name',
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
      label: 'Edit',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: 'Delete',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        console.log(event);
        // this.hallService.removeShowing(event.hall_id, event.showing_id).subscribe();
        this.events = this.events.filter((iEvent) => iEvent !== event);
        this.handleEvent('Deleted', event);
      },
    },
  ];

  refresh: Subject<any> = new Subject();
  
  AllEvents: any[] = [];
  events: any[] = [];

  activeDayIsOpen: boolean = true;

  constructor( private hallService: HallService,
    private movieService: MovieService,
    private modal: NgbModal) {
      
      this.selectFields = [
        {
          key: 'hall_id',
          type: 'select',
           hooks: {
            onInit(field: any) {
              const control = field.formControl;
              if (control.value === null) {

                const newHalls:any = [];

                hallService.getHalls().subscribe( (halls:any) => {
      
                  halls.forEach( (hall:any) =>{
                    newHalls.push(hall._id);
                  })
                });
                control.setValue(newHalls);
              }
            }
          },
          templateOptions: {
            label: 'Hall',
            placeholder: 'Choose hall',
            required: true,
            options: this.hallService.getHalls(),
            valueProp: '_id',
            labelProp: 'name',
            multiple: true,
            appearance: 'outline'
          }
        }
      ];
    }

  ngOnInit(): void {

    this.hallService.getHalls().subscribe( (halls:any) => {
      halls.map( ({ _id, name, taken_sessions}:any, index: number) =>{
        taken_sessions.forEach( (showing:any) => {
          this.AllEvents.push({
            hall_id: _id,
            hall_name: name, 
            showing_id: showing._id,
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
    })

    this.lastChange = this.AllEvents;
    this.events = this.AllEvents;
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

  handleEvent(action: string, event: CalendarEvent): void {
    this.modalData = { event, action };
    this.modal.open(this.modalContent, { size: 'lg' });
  }

  addEvent(): void {

    const { hall_id, movie_id, start } = this.addMovietoHall;


    const hall_name:any=[];
      this.hallService.getHalls().subscribe( (halls:any) => {
        halls.map((hall:any) => {
          return hall._id === hall_id ? hall_name.push(hall.name) : null
        })
      });
    
    
    this.movieService.getMovie(movie_id).subscribe( (movies: any) => {
  
      this.hallService.addShowingToHall(hall_id, {
        'movie': movies.name,
        'start': start,
        'end': new Date(Date.parse(start) + movies.duration*60000)
      }).subscribe( data => console.log(data));

    this.events = [
      ...this.events,
      {
        hall_id: hall_id,
        hall_name: hall_name[0],
        showing_id: movies._id,
        title: movies.name,
        start: start,
        end: new Date(Date.parse(start) + movies.duration*60000),
        color: colors[0],
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]
  
  });

  };

  deleteEvent( eventToDelete: {hall_id: any, showing_id: any} ) {
    console.log(eventToDelete);
    this.AllEvents=[];
    this.hallService.getHalls().subscribe( (halls:any) => {
      halls.map( ({ _id, name, taken_sessions}:any, index: number) =>{
        taken_sessions.forEach( (showing:any) => {
          this.AllEvents.push({
            hall_id: _id,
            hall_name: name, 
            showing_id: showing._id,
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
    })
    this.hallService.removeShowing(eventToDelete.hall_id, eventToDelete.showing_id).subscribe();

  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
