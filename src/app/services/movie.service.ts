import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieUrl: string = 'api/movies';
  constructor( private webService: WebService) { }

  getMovies(){
    return this.webService.get(this.movieUrl, '');
  }

  addMovie( object: Object){
    return this.webService.post(this.movieUrl, object);
  }

  updateMovie(id: any, object: Object){
    return this.webService.put(this.movieUrl,id, object);
  }

  deleteMovie(id: any){
    return this.webService.delete(this.movieUrl, id);
  }

}
