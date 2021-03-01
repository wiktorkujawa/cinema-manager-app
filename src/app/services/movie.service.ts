import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  movieUrl: string = 'api/movies';
  constructor( private webService: WebService) { }

  getMovies(){
    return this.webService.get(this.movieUrl);
  }

  getMovie(title: any){
    return this.webService.get(`${this.movieUrl}/${title}`);
  }

  searchMovie(title: string){
    return this.webService.get(`${this.movieUrl}/search/${title}`);
  }

  addMovie( object: object){
    return this.webService.post(this.movieUrl, object);
  }

  updateMovie(title: any, object: object){
    return this.webService.put(this.movieUrl,title, object);
  }

  deleteMovie(title: any){
    return this.webService.delete(this.movieUrl, title);
  }

}
