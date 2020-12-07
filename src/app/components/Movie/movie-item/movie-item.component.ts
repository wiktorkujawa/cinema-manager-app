import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: any;
  @Input() username: any;
  @Output() deleteMovie : EventEmitter<any> = new EventEmitter();
  @Output() openUpdateDialog : EventEmitter<any> = new EventEmitter();
  environment: string = environment.apiUrl;
  constructor() {}

  
  ngOnInit(): void {
  }
  

  onUpdate(_id:any) {
    this.openUpdateDialog.emit(_id);
  }
  onDelete(_id:any) {
    this.deleteMovie.emit(_id);
  }

}