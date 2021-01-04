import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { HallService } from 'src/app/services/hall.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {


  movieInfo: any = {
    title:'',
    description:'',
    duration:'',
    poster:''
  }

  @Input() username!: string;

  displayedColumns: string[]  = ['name', 'start', 'end'];
  displayedColumnsOnLog: string[]  = ['name', 'start', 'end', 'Remove'];

  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;

  contentMargin!: string;

  imagePadding!: string;

  Breakpoint = {
    contentMargin:{
      xl: "0 20rem",
      lg: "0 15rem",
      md: "0 10rem",
      sm: "0 2rem",
      xs: "0 0.5rem"
    },
    imagePadding:{
      xl: "1rem 4rem",
      lg: "1rem 3rem",
      md: "1rem 2rem",
      sm: "1rem 1.5rem",
      xs: "1rem 1rem"
    }


  }

  constructor(private activatedRoute: ActivatedRoute,
    private movieService: MovieService,
    private hallService: HallService,
    private breakpointObserver: BreakpointObserver) {

      this.breakpointObserver.observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ]).subscribe(result => {
        if (result.matches) {
          if (result.breakpoints[Breakpoints.XSmall]) {
            this.contentMargin = this.Breakpoint.contentMargin.xs;
            this.imagePadding = this.Breakpoint.imagePadding.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.contentMargin = this.Breakpoint.contentMargin.sm;
            this.imagePadding = this.Breakpoint.imagePadding.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.contentMargin = this.Breakpoint.contentMargin.md;
            this.imagePadding = this.Breakpoint.imagePadding.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.contentMargin = this.Breakpoint.contentMargin.lg;
            this.imagePadding = this.Breakpoint.imagePadding.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.contentMargin = this.Breakpoint.contentMargin.xl;
            this.imagePadding = this.Breakpoint.imagePadding.xl;
          }
        }
      });

  }

  form = new FormGroup({});

  fields: any[] = [
    {
      key: 'value',
      type: 'input',
      templateOptions: {
        label: 'Filter by Hall',
        placeholder: 'Type Hall name',
      }
    }];

  filter = { value:''};
  
  applyFilter(){
    this.dataSource.filter = this.filter.value.trim().toLowerCase();
  }

  ngOnInit(): void { 
    let title = this.activatedRoute.snapshot.paramMap.get('title');
      this.movieService.getMovie(title).subscribe( movieInfo => this.movieInfo = movieInfo);

      this.hallService.getShowing(title).subscribe( movieSchedule =>{ 
        this.dataSource = new MatTableDataSource(movieSchedule);
        setTimeout(() => {
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch(property) {
              case 'start': return item.taken_sessions.start;
              default: return item[property];
            }
          };
          this.dataSource.sort = this.sort;
        });
      });
      
      
   }


   onDeleteFromHall( name:any, id:any){
     this.hallService.removeShowing(name, id).subscribe();
     this.dataSource.data = this.dataSource.data.filter( (t:any) => t.taken_sessions._id !== id );
   }

}
