import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { WebService } from 'src/app/services/web.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  @Output() addMovie: EventEmitter<any> = new EventEmitter();

  movieData = {
    title: '',
    description: '',
    poster: '',
    duration: 0,
    imdb:{
      Title:'',
      Year:'',
      Poster:''
    }
  };


  form = new FormGroup({});
fields: any[] = [
    {
      key: 'title',
      type: 'input',
      templateOptions: {
        label: 'Movie title',
        change: () => {

          this.movieService.searchMovie(this.movieData.title).subscribe( (response:any) =>{
            this.fields[2].templateOptions.options = response.Search;
          })
         
      },
        placeholder: 'Enter title',
        required: true,
        appearance: 'outline'
      }
    },
    {
      key: 'duration',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Movie duration[minutes]',
        placeholder: 'Add duration[minutes]',
        appearance: 'outline'
      }
    },
    {
      key: 'imdb',
      type: 'select',
      templateOptions: {
        label: 'Movie',
        change: () => {
          this.form.controls.title.setValue(`${this.movieData.imdb.Title}(${this.movieData.imdb.Year})`);
          this.form.controls.poster.setValue(this.movieData.imdb.Poster);

      },
        placeholder: 'Choose movie',
        required: true,
        valueProp: (option:any) => option,
        labelProp: 'Title',
        appearance: 'outline'
      },
    },
    {
      key: 'poster',
      type: 'input',
      templateOptions: {
        label: 'Poster link',
        placeholder: 'Add poster link',
        appearance: 'outline'
      }
    },
    {
      key: 'description',
      type: 'textarea',
      templateOptions: {
        label: 'Description',
        placeholder: 'Add description',
        rows: 10,
        appearance: 'outline'
      }
    },
    
  ];

  // in app.component.ts

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any,
    private movieService: MovieService) { }

  ngOnInit(): void {}


  onChange(){
    console.log("change");
  }


  onSubmit() {
      this.addMovie.emit({
        title: this.movieData.title,
        description: this.movieData.description,
        duration: this.movieData.duration,
        poster: this.movieData.poster
      });  
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

}