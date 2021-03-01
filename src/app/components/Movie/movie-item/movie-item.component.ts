import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-item',
  templateUrl: './movie-item.component.html',
  styleUrls: ['./movie-item.component.scss']
})
export class MovieItemComponent implements OnInit {
  @Input() movie: any;
  @Input() username: any;

  // root: any = this.route;
  @Output() deleteMovie : EventEmitter<any> = new EventEmitter();
  @Output() openUpdateDialog : EventEmitter<any> = new EventEmitter();
  environment: string = environment.apiUrl;
  constructor( private router: Router, private route: ActivatedRoute) {}

  
  ngOnInit(): void {}
  

  onSelect(){
    this.router.navigate([this.movie.title], {relativeTo: this.route})
  }
  onUpdate(title:any) {
    this.openUpdateDialog.emit(title);
  }
  onDelete(title:any) {
    this.deleteMovie.emit(title);
  }

}