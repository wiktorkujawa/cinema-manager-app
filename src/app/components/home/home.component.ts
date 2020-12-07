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

  addMovietoHall = {
    hall_id:'',
    movie_id:'',
    start:''
  };

  select: any;
  selectHall = new FormControl();
  
  onChange(){

      this.events=[]
      this.AllEvents.forEach((element, index) => {
        this.selectHall.value.forEach( (selected:string) => {
          selected==element[0].hall_id ? this.events=this.events.concat(...this.AllEvents[index]) : null })
          
        });
  }

  halls: any = [];
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
        // appearance: 'outline'
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
        // appearance: 'outline'
      }
    },
    {
      key: 'start',
      type: 'datepicker',
      templateOptions: {
        label: 'Date',
        placeholder: 'Placeholder',
        description: 'Description',
        required: true,
      }
    }
  ];

  modalData: {
    action: string;
    event: CalendarEvent;
  } | undefined;


  
  

  actions: CalendarEventAction[] = [
    {
      label: '<i class="fas fa-fw fa-pencil-alt"></i>',
      a11yLabel: 'Edit',
      onClick: ({ event }: { event: CalendarEvent }): void => {
        this.handleEvent('Edited', event);
      },
    },
    {
      label: 'Delete',
      a11yLabel: 'Delete',
      onClick: ({ event }: { event: CalendarEvent }): void => {
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
    private modal: NgbModal) { }

  ngOnInit(): void {
    this.hallService.getHalls().subscribe( halls => {
      halls.forEach( hall => {
        this.halls.push({id:hall._id, name:hall.name});
      });

      const events = new Array(this.halls.length);
      for (var i = 0; i < events.length; i++) {
        events[i] = [];
      }
      
      halls.forEach((showings, index) => {
        showings.taken_sessions.forEach( (showing: { _id: any, movie: string, start: string, end: string }) => {
          events[index].push({
            hall_id: this.halls[index].id,
            showing_id: showing._id,
            title: showing.movie,
            actions: this.actions,
            start: parseISO(showing.start),
            end: parseISO(showing.end),
            color: colors[index],
            resizable: {
              beforeStart: true,
              afterEnd: true,
            },
            draggable: true
          })  
        });

       
        

      })
      // this.AllEvents = events[0];
      events.forEach((element) => {
        if(element != 0){
          this.AllEvents.push(element);
        }
        this.events= [].concat(...this.AllEvents);
      });
    });

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
        showing_id: movies._id,
        title: movies.name,
        start: start,
        end: new Date(Date.parse(start) + movies.duration*60000),
        color: colors.red,
        draggable: true,
        resizable: {
          beforeStart: true,
          afterEnd: true,
        },
      },
    ]});
  };

  deleteEvent(eventToDelete: CalendarEvent) {
    console.log(eventToDelete);
    // this.hallService.removeShowing(events.hall_id, events.showing_id).subscribe();
    this.events = this.events.filter((event) => event !== eventToDelete);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
