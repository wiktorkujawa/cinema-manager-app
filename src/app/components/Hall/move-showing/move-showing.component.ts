import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { HallService } from 'src/app/services/hall.service';

@Component({
  selector: 'app-move-showing',
  templateUrl: './move-showing.component.html',
  styleUrls: ['./move-showing.component.scss']
})
export class MoveShowingComponent implements OnInit {

  @Output() onMoveShowing: EventEmitter<any> = new EventEmitter();

  newHall = {
    name: ''
  };
  form = new FormGroup({});
fields: FormlyFieldConfig[] = [
  {
    key: 'name',
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
  }
  ];

  constructor(@Inject(MAT_DIALOG_DATA) 
  public data:any,
  public dialog: MatDialog,
  private hallService: HallService) { }

  ngOnInit(): void {
    
    console.log(this.data);
  }

  onNoClick() {
    this.dialog.closeAll();
  };


  onSubmit(){
    this.onMoveShowing.emit(this.newHall.name);
  }
}
