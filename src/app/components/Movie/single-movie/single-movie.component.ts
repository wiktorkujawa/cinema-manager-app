import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,
    private movieService: MovieService
    ) {
    this.activatedRoute.queryParams.subscribe(params => {
          let date = params['name'];
          console.log(params); // Print the parameter to the console. 
      });
  }

  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get('name');
    console.log(name);

    // this.movieService.getMovie()
  }

}
