import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-hall',
  templateUrl: './update-hall.component.html',
  styleUrls: ['./update-hall.component.scss']
})
export class UpdateHallComponent implements OnInit {
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
        placeholder: 'Enter name',
        required: true,
        appearance: 'outline'
      }
    }
  ];
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
    this.hallData.name=this.data.hall[0].name
  }

  onNoClick() {
    this.dialog.closeAll();
  };
  

  onSubmit() {

      this.updateHall.emit(this.hallData);
    }

}

