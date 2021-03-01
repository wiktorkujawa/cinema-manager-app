import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ThemePalette } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import * as moment from 'moment';
import { HallService } from 'src/app/services/hall.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-add-showing',
  templateUrl: './add-showing.component.html',
  styleUrls: ['./add-showing.component.scss']
})
export class AddShowingComponent implements OnInit {

  @Output() addShowing: EventEmitter<any> = new EventEmitter();

  constructor(public dialog: MatDialog,
     private hallService: HallService,
    private movieService: MovieService) { }

    
    addMovietoHall = {
      hall_name: '',
      title:'',
      start:''
    };

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
      type: 'datetimepicker',
      templateOptions: {
        label: 'Date',
        placeholder: 'Choose start date',
        required: true,
        appearance: 'outline'
      }
    }
  ];

  ngOnInit(): void {
  }


  onSubmit(){
    this.addShowing.emit(this.addMovietoHall);
  }


  onNoClick() {
    this.dialog.closeAll();
  };
  

}
