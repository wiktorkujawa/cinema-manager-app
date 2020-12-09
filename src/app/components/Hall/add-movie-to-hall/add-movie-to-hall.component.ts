import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-movie-to-hall',
  templateUrl: './add-movie-to-hall.component.html',
  styleUrls: ['./add-movie-to-hall.component.scss']
})
export class AddMovieToHallComponent implements OnInit {

  @Output() addMovieToHall: EventEmitter<{movie:any, start: any, end: any}> = new EventEmitter();

  selectedMovie = <any>{};

  duration: any;

  form = new FormGroup({});

  fields: FormlyFieldConfig[] = [
    {
      key: 'movieData',
      type: 'select',
      templateOptions: {
        required: true,
        label: 'Movie',
        options: this.movieService.getMovies(),
        appearance: 'outline',
        valueProp: (option: any) => option,
        compareWith: (o1: any, o2: any) => o1.value === o2.value,
        labelProp: 'name',
      },
    },
    {
      key: 'start',
      type: 'datepicker',
      templateOptions: {
        label: 'Start of showing',
        placeholder: 'Enter start date',
        required: true,
        appearance: 'outline'
      }
    }
  ];


  constructor( 
    @Inject(MAT_DIALOG_DATA) 
    public data:any,
    public dialog: MatDialog,
    private movieService: MovieService
  ) {}


  onNoClick() {
    this.dialog.closeAll();
  };
  

  onSubmit() {
    console.log(this.selectedMovie);
    this.addMovieToHall.emit({
      movie: this.selectedMovie.movieData.name, 
      start: this.selectedMovie.start,
      end: new Date(Date.parse(this.selectedMovie.start) + this.selectedMovie.movieData.duration*60000)
    });
  }

  ngOnInit(): void {
    this.movieService.getMovies().subscribe( movie => this.selectedMovie.movieData = movie[0]);

  }

}
