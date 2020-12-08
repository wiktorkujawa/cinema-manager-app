import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { environment } from 'src/environments/environment';

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
    duration: 0
  };
  form = new FormGroup({});
fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Movie title',
        placeholder: 'Enter title',
        required: true,
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
    {
      key: 'duration',
      type: 'input',
      templateOptions: {
        type: 'number',
        label: 'Movie duration[minutes]',
        placeholder: 'Add duration[minutes]',
        appearance: 'outline'
      }
    }
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
    
  }

  onNoClick() {
    this.movieData.name=this.data.movie[0].name;
    this.movieData.description=this.data.movie[0].description;
    this.movieData.duration=this.data.movie[0].duration;
    this.dialog.closeAll();
  };
  

  onSubmit() {
      const movie = {
        name: this.movieData.name,
        description: this.movieData.description,
        duration: this.movieData.duration
      }
      this.updateMovie.emit(this.movieData);
    }

}

