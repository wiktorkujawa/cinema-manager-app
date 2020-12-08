import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { AddMovieComponent } from '../../Movie/add-movie/add-movie.component';
import { UpdateMovieComponent } from '../../Movie/update-movie/update-movie.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  @Input() username: any;
  movies: any;

  // onOutletLoaded(event : any) {
  //   console.log(event);
  // }
  cols! : number;
  margin!: string;
  gutter!: string;
  environment: string = environment.apiUrl;


  Breakpoint = {
    grid:{
      xl: 5,
      lg: 4,
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


  constructor(private movieService: MovieService,
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
  this.movieService.getMovies().subscribe( movies => {
    this.movies = movies;
  })
}


openDialog(){
  const ref = this.dialog.open(AddMovieComponent, { width: '60vw',
  minWidth:"350px",
  panelClass: 'my-dialog', 
  data: this.username
  });
  const sub = ref.componentInstance.addMovie.subscribe((movie:any) => {
    this.movieService.addMovie(movie).subscribe( movie => this.movies.push(movie));
  });
    ref.afterClosed().subscribe(() => {
    sub.unsubscribe();
  });
}

openUpdateDialog(id:any){
  const ref = this.dialog.open(UpdateMovieComponent, { width: '60vw',
  minWidth:"350px",
  panelClass: 'my-dialog', data: {
  movie: this.movies.filter( (movie:any) => id === movie._id ),
  username: this.username
}});
  const sub = ref.componentInstance.updateMovie.subscribe((movie: any) => {
  const index = this.movies.findIndex((movie:any) => movie._id === id);
  this.movieService.updateMovie(id,movie).subscribe( movie => this.movies[index] = movie);
});
  ref.afterClosed().subscribe(() => {
  sub.unsubscribe();
});
}


deleteMovie(id:any) {
  // Remove from UI
  this.movies = this.movies.filter( (t:any) => t._id !== id );
  // Remove from server
  this.movieService.deleteMovie(id).subscribe();
}


}