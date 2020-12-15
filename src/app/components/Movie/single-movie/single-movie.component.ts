import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-movie',
  templateUrl: './single-movie.component.html',
  styleUrls: ['./single-movie.component.scss']
})
export class SingleMovieComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParams.subscribe(params => {
          let date = params['name'];
          console.log(params); // Print the parameter to the console. 
      });
  }

  ngOnInit(): void {
    let name = this.activatedRoute.snapshot.paramMap.get('name');
    console.log(name);
  }

}
