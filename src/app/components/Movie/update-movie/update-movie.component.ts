import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-movie',
  templateUrl: './update-movie.component.html',
  styleUrls: ['./update-movie.component.scss']
})
export class UpdateMovieComponent implements OnInit {
  name!: string;
  description!: string;
  environment: string = environment.apiUrl;
  // in app.component.ts
  id: any;
  
  @Output() updateMovie: EventEmitter<any> = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data:any,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.name=this.data.movie[0].name
    this.description=this.data.movie[0].description
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

  onSubmit() {
      const movie = {
        name: this.name,
        description: this.description
      }
      this.updateMovie.emit(movie);
    }

}

