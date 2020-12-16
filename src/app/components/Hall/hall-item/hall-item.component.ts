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
  @Output() deleteMovie : EventEmitter<{name:any, movie_id:any}> = new EventEmitter();
  @Output() openAddMovieDialog : EventEmitter<any> = new EventEmitter();
  environment: string = environment.apiUrl;
  constructor() {}

  
  ngOnInit(): void {
  }
  

  onDeleteFromHall(movie_id: string){
    this.deleteMovie.emit({ name: this.hall.name, movie_id: movie_id});
  }

  onUpdate(name :any) {
    this.openUpdateDialog.emit(name);
  }
  
  onDelete(name:any) {
    this.deleteHall.emit(name);
  }

  onAddMovie(name:any){
    this.openAddMovieDialog.emit(name);
  }

}