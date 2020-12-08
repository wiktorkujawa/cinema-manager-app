import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HallService } from 'src/app/services/hall.service';
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
  @Output() deleteMovie : EventEmitter<{hall_id:any, movie_id:any}> = new EventEmitter();
  environment: string = environment.apiUrl;
  constructor(
    private hallService: HallService
  ) {}

  
  ngOnInit(): void {
  }
  

  onDeleteFromHall(movie_id: string){
    this.deleteMovie.emit({hall_id: this.hall._id, movie_id: movie_id});
  }
  onUpdate(_id:any) {
    this.openUpdateDialog.emit(_id);
  }
  onDelete(_id:any) {
    this.deleteHall.emit(_id);
  }

}