import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-hall',
  templateUrl: './add-hall.component.html',
  styleUrls: ['./add-hall.component.scss']
})
export class AddHallComponent implements OnInit {
  @Output() addHall: EventEmitter<any> = new EventEmitter();

  name!: string;
  // in app.component.ts

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any) { }

  ngOnInit(): void {
    this.name = this.data.name;
  }


  onSubmit() {


      const hall = {
        name: this.name,
      }
      this.addHall.emit(hall);
    
    
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

}