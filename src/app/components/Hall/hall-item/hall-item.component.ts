import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
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
  @Output() openMoveShowingDialog : EventEmitter<{hall_name: any, showing_id: any}> = new EventEmitter();
  @Output() deleteMovie : EventEmitter<{name:any, movie_id:any}> = new EventEmitter();
  @Output() openAddMovieDialog : EventEmitter<any> = new EventEmitter();
  environment: string = environment.apiUrl;
  

  displayedColumnsOnLog: string[] = [ 'Title', 'Starts at', 'Ends at', 'Move to Hall', 'Remove'];
  displayedColumns: string[] = [ 'Title', 'Starts at', 'Ends at'];

  @ViewChild(MatTable) table!: MatTable<any>;
  
  constructor() {}

  
  ngOnInit(): void {
  }
  
  onDeleteFromHall(movie_id: string){
    this.deleteMovie.emit({ name: this.hall.name, movie_id: movie_id});
  }

  onUpdate(name :any) {
    this.openUpdateDialog.emit(name);
  }

  onMoveShowing(showing_id: any) {
    this.openMoveShowingDialog.emit({hall_name: this.hall.name, showing_id: showing_id});
  }
  
  onDelete(name:any) {
    this.deleteHall.emit(name);
  }

  onAddMovie(name:any){
    this.openAddMovieDialog.emit(name);
  }

}