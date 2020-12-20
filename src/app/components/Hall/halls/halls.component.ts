import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HallService } from 'src/app/services/hall.service';
import { AddHallComponent } from '../add-hall/add-hall.component';
import { UpdateHallComponent } from '../update-hall/update-hall.component';
import { AddMovieToHallComponent } from '../add-movie-to-hall/add-movie-to-hall.component';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.scss']
})
export class HallsComponent implements OnInit {
  @Input() username: any;
  halls: any;

  cols! : number;
  margin!: string;
  gutter!: string;


  Breakpoint = {
    grid:{
      xl: 4,
      lg: 3,
      md: 2,
      sm: 1,
      xs: 1
    },
    margin:{
      xl: "2rem",
      lg: "1.7rem",
      md: "1.4rem",
      sm: "1.1rem",
      xs: "0.8rem"
    },
    gutter:{
      xl: "50px",
      lg: "40px",
      md: "30px",
      sm: "20px",
      xs: "10px"
    }
  }


  constructor(private hallService: HallService,
    public dialog: MatDialog,
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
            this.cols = this.Breakpoint.grid.xs;
            this.margin = this.Breakpoint.margin.xs;
            this.gutter = this.Breakpoint.gutter.xs;
          }
          if (result.breakpoints[Breakpoints.Small]) {
            this.cols = this.Breakpoint.grid.sm;
            this.margin = this.Breakpoint.margin.sm;
            this.gutter = this.Breakpoint.gutter.sm;
          }
          if (result.breakpoints[Breakpoints.Medium]) {
            this.cols = this.Breakpoint.grid.md;
            this.margin = this.Breakpoint.margin.md;
            this.gutter = this.Breakpoint.gutter.md;
          }
          if (result.breakpoints[Breakpoints.Large]) {
            this.cols = this.Breakpoint.grid.lg;
            this.margin = this.Breakpoint.margin.lg;
            this.gutter = this.Breakpoint.gutter.lg;
          }
          if (result.breakpoints[Breakpoints.XLarge]) {
            this.cols = this.Breakpoint.grid.xl;
            this.margin = this.Breakpoint.margin.xl;
            this.gutter = this.Breakpoint.gutter.xl;
          }
        }
      });
    }

ngOnInit(): void {
  this.hallService.getHalls().subscribe( halls => {
  this.halls = halls;
  })
}


openDialog(){
  const ref = this.dialog.open(AddHallComponent, { 
    width: '60vw',
    minWidth:"350px",
    panelClass: 'my-dialog', 
    data: this.username
  });
  const sub = ref.componentInstance.addHall.subscribe((hall:any) => {
    this.hallService.addHall(hall).subscribe( hall => this.halls.push(hall));
  });
  ref.afterClosed().subscribe(() => {
    sub.unsubscribe();
  });
}

openAddMovieDialog(name: any){
  const ref = this.dialog.open(AddMovieToHallComponent, { 
    width: '60vw',
    minWidth:"350px",
    panelClass: 'my-dialog', 
    data: {
      hall_name: name,
      username: this.username
    }
  });
  const sub = ref.componentInstance.addMovieToHall.subscribe((showing: any) => {
    
    this.hallService.addShowingToHall(name,{ movie: showing.movie, start: showing.start, end: showing.end}).subscribe( hall => {
      this.halls[this.halls.map( (e:any) => { return e.name; }).indexOf(name)].taken_sessions.push(hall);
    });
  });
  ref.afterClosed().subscribe(() => {
    sub.unsubscribe();
  });
}

openUpdateDialog(name:any){
  const ref = this.dialog.open(UpdateHallComponent, { 
    width: '60vw',
    minWidth:"350px",
    panelClass: 'my-dialog', 
    data: {
      hall: this.halls.filter( (hall:any) => name === hall.name ),
      username: this.username
    }
  });
  const sub = ref.componentInstance.updateHall.subscribe((hall: any) => {
    const index = this.halls.findIndex((hall:any) => hall.name === name);
    this.hallService.changeHallName( name, hall).subscribe( 
      (hall) => this.halls[index].name = hall);
  });
  ref.afterClosed().subscribe(() => {
    sub.unsubscribe();
  });
}


deleteHall( name :any) {
  // Remove from UI
  this.halls = this.halls.filter( (t:any) => t.name !== name );
  // Remove from server
  this.hallService.removeHall(name).subscribe();
}

addShowing( data:any){
  this.hallService.addShowingToHall( data.name, data.movie).subscribe();
}

deleteMovie(data: any) {
  // Remove from UI and server
  this.hallService.removeShowing(data.name, data.movie_id).subscribe(() => {
    this.halls = this.halls.map( (hall: any) => {
      return {
        name: hall.name,
        taken_sessions: hall.taken_sessions.filter( (movie:any) => movie._id!= data.movie_id )
      };
    });

  });
  }
}