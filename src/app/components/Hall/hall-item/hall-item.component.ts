import { Component, EventEmitter, Input, OnInit, Output, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FormlyField, FormlyFieldConfig } from '@ngx-formly/core';
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
  

  displayedColumnsOnLog: string[] = [ 'movie', 'start', 'end', 'Move to Hall', 'Remove'];
  displayedColumns: string[] = [ 'movie', 'start', 'end'];

  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  
  @ViewChild(MatTable) table!: MatTable<any>;

  

  dataSource!: MatTableDataSource<any>;
  
  constructor() {}


  form = new FormGroup({});

  fields: any[] = [
    {
      key: 'value',
      type: 'input',
      templateOptions: {
        label: 'Filter title',
        placeholder: 'Type title',
      }
    }];

  filter = { value:''};
  
  applyFilter(){
    this.dataSource.filter = this.filter.value.trim().toLowerCase();
  }


  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.hall.taken_sessions);
    setTimeout(() => {
      this.dataSource.sort = this.sort;
    });
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