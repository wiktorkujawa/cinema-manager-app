import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  hallUrl: string = 'api/halls';
  constructor( private webService: WebService) { }

  getHalls(){
    return this.webService.get(this.hallUrl);
  }

  getHall(id: any){
    return this.webService.get(`${this.hallUrl}/${id}`);
  }

  getShowing(name: string){
    return this.webService.get(`${this.hallUrl}/movie/${name}` );
  }

  addHall(object: object){
    return this.webService.post(this.hallUrl, object);
  }

  changeHallName(id:any, name: object){
    return this.webService.put(this.hallUrl+'/name',id, name)
  }

  addShowingToHall(id: any, object: object){
    return this.webService.put(this.hallUrl+'/taken_sessions', id, object);
  }

  moveShowing( showing_id: any, id_from: any, id_to: any){
    return this.webService.put(this.hallUrl,`${showing_id}/from/${id_from}/to/${id_to}` , {});
  }

  removeHall( id:any ){
    return this.webService.delete(this.hallUrl,id);
  }

  removeShowing(hall_id: any, movie_id: any){
    return this.webService.delete(this.hallUrl,`${hall_id}/${movie_id}`)
  }

}
