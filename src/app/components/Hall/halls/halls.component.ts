import { Component, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { environment } from 'src/environments/environment';
import { HallService } from 'src/app/services/hall.service';
import { AddHallComponent } from '../add-hall/add-hall.component';
import { UpdateHallComponent } from '../update-hall/update-hall.component';

@Component({
  selector: 'app-halls',
  templateUrl: './halls.component.html',
  styleUrls: ['./halls.component.scss']
})
export class HallsComponent implements OnInit {
  @Input() username: any;
  halls: any;

  // onOutletLoaded(event : any) {
  //   console.log(event);
  // }
  cols! : number;
  margin!: string;
  gutter!: string;
  environment: string = environment.apiUrl;


  Breakpoint = {
    grid:{
      xl: 4,
      lg: 3,
      md: 3,
      sm: 2,
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
const ref = this.dialog.open(AddHallComponent, { width: '60vw',
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

openUpdateDialog(id:any){
const ref = this.dialog.open(UpdateHallComponent, { width: '60vw',
minWidth:"350px",
panelClass: 'my-dialog', data: {
hall: this.halls.filter( (hall:any) => id === hall._id ),
username: this.username
}});
const sub = ref.componentInstance.updateHall.subscribe((hall: any) => {
const index = this.halls.findIndex((hall:any) => hall._id === id);
this.hallService.changeHallName(id,hall).subscribe( hall => this.halls[index] = hall);
});
ref.afterClosed().subscribe(() => {
sub.unsubscribe();
});
}


deleteHall(id:any) {
// Remove from UI
this.halls = this.halls.filter( (t:any) => t._id !== id );
// Remove from server
this.hallService.removeHall(id).subscribe();
}

deleteMovie(data: any) {
  
  
  // Remove from UI
this.halls = this.halls.map(function(hall: any) {
  return {
    _id: data.hall_id,
    taken_sessions: hall.taken_sessions.filter( (movie:any) => movie._id!= data.movie_id )
  };
});
  // Remove from server
  this.hallService.removeShowing(data.hall_id, data.movie_id).subscribe();
  }




}