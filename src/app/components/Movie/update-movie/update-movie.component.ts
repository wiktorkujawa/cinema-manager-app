import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { environment } from 'src/environments/environment';
import axios from 'axios';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnInit {
  environment: string = environment.apiUrl;
  // in app.component.ts
  id: any;

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

  form = new FormGroup({});
  fields: any[] = [
    {
      key: 'name',
      type: 'input',
      // hooks: {
      //   onInit(field: any) {
      //     const control = field.formControl;
      //     if (control.value !== null) {
      //       if(control.value.endsWith(')')){
      //         control.value=control.value.slice(0,-6);
      //       }
      //       console.log(control.value);
      //       axios.request({
      //         method: 'GET',
      //         url: 'https://movie-database-imdb-alternative.p.rapidapi.com/',
      //         params: {s: control.value, page: '1', r: 'json'},
      //         headers: {
      //           'x-rapidapi-key': 'a16322f6admsh01988b356dbb0cfp1d6770jsn9b2faae37767',
      //           'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      //         }
      //       }).then( (response) => {
      //         console.log(response.data.Search);
      //         console.log(field);
      //         // this.fields[2].templateOptions.options = response.data.Search;
      //       }).catch( (error) => {
      //         console.error(error);
      //       });
      //     }
      //   }
      // },
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
  
  @Output() updateMovie: EventEmitter<any> = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data:any,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.movieData.name=this.data.movie[0].name;
    this.movieData.description=this.data.movie[0].description;
    this.movieData.duration=this.data.movie[0].duration;
    this.movieData.poster=this.data.movie[0].poster;
    
  }

  onNoClick() {
    this.movieData.name=this.data.movie[0].name;
    this.movieData.description=this.data.movie[0].description;
    this.movieData.duration=this.data.movie[0].duration;
    this.movieData.duration=this.data.movie[0].poster;
    this.dialog.closeAll();
  };
  

  onSubmit() {
      const movie = {
        name: this.movieData.name,
        description: this.movieData.description,
        duration: this.movieData.duration,
        poster: this.movieData.poster
      }
      this.updateMovie.emit(this.movieData);
    }

}

