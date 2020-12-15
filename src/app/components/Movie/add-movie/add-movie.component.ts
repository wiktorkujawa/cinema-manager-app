import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { switchMap, startWith } from 'rxjs/operators';
import axios from "axios";

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  @Output() addMovie: EventEmitter<any> = new EventEmitter();

  movieData = {
    name: '',
    description: '',
    poster: '',
    duration: 0,
    imdb:{
      Title:'',
      Year:'',
      Poster:''
    }
  };

  imdbSearch: any[]=[];

  form = new FormGroup({});
fields: any[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Movie title',
        change: (field: any) => {
          axios.request({
            method: 'GET',
            url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
            params: {s: this.movieData.name, page: '1', r: 'json'},
            headers: {
              'x-rapidapi-key': 'a16322f6admsh01988b356dbb0cfp1d6770jsn9b2faae37767',
              'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
            }
          }).then( (response) => {
            this.fields[2].templateOptions.options = response.data.Search;
          }).catch( (error) => {
            console.error(error);
          });
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
          this.form.controls.name.setValue(`${this.movieData.imdb.Title}(${this.movieData.imdb.Year})`);
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
    public data:any) { }

  ngOnInit(): void {}


  onChange(){
    console.log("change");
  }


  onSubmit() {
      this.addMovie.emit(this.movieData);  
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

}