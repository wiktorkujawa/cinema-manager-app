import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-hall',
  templateUrl: './update-hall.component.html',
  styleUrls: ['./update-hall.component.scss']
})
export class UpdateHallComponent implements OnInit {
  name!: string;
  environment: string = environment.apiUrl;
  // in app.component.ts
  id: any;
  
  @Output() updateHall: EventEmitter<any> = new EventEmitter();
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data:any,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.name=this.data.hall[0].name
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

  onSubmit() {
      const hall = {
        name: this.name,
      }
      this.updateHall.emit(hall);
    }

}

