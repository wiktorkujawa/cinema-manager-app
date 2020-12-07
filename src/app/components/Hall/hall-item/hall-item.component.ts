import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-hall-item',
  templateUrl: './hall-item.component.html',
  styleUrls: ['./hall-item.component.scss']
})
export class HallItemComponent implements OnInit {
  @Input() hall: any;
  @Input() username: any;
  @Output() deleteHall : EventEmitter<any> = new EventEmitter();
  @Output() openUpdateDialog : EventEmitter<any> = new EventEmitter();
  environment: string = environment.apiUrl;
  constructor() {}

  
  ngOnInit(): void {
  }
  

  onUpdate(_id:any) {
    this.openUpdateDialog.emit(_id);
  }
  onDelete(_id:any) {
    this.deleteHall.emit(_id);
  }

}