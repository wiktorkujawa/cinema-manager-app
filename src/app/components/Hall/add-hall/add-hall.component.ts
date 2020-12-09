import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-add-hall',
  templateUrl: './add-hall.component.html',
  styleUrls: ['./add-hall.component.scss']
})
export class AddHallComponent implements OnInit {
  @Output() addHall: EventEmitter<any> = new EventEmitter();

  hallData = {
    name: ''
  };
  form = new FormGroup({});
fields: FormlyFieldConfig[] = [
    {
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Hall name',
        placeholder: 'Enter Hall name',
        required: true,
        appearance: 'outline'
      }
    }
  ];

  // in app.component.ts

  constructor(public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) 
    public data:any) { }

  ngOnInit(): void {
  }


  onSubmit() {
      this.addHall.emit(this.hallData);      
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

}