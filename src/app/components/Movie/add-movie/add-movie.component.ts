import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.scss']
})
export class AddMovieComponent implements OnInit {
  @Output() addMovie: EventEmitter<any> = new EventEmitter();

  name!: string;
  // in app.component.ts

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any) { }

  ngOnInit(): void {
    this.name = this.data.name;
  }


  onSubmit() {


      const movie = {
        name: this.name,
      }
      this.addMovie.emit(movie);
    
    
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

}