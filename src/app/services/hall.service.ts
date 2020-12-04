import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class HallService {
  hallUrl: string = 'api/halls';
  constructor( private hallService: WebService) { }

  getHalls(){
    return this.hallService.get(this.hallUrl,'');
  }

  getHall(id: any){
    return this.hallService.get(this.hallUrl, id);
  }

  getShowing(name: string){
    return this.hallService.get(this.hallUrl+'/movie', name );
  }

  addHall(object: Object){
    return this.hallService.post(this.hallUrl, object);
  }

  changeHallName(id:any, name: string){
    return this.hallService.put(this.hallUrl+'/name',id, name)
  }

  addShowingToHall(id: any, object: Object){
    return this.hallService.put(this.hallUrl+'/taken_sessions', id, object);
  }

  moveShowing( showing_id: any, id_from: any, id_to: any){
    return this.hallService.put(this.hallUrl,`${showing_id}/from/${id_from}/to/${id_to}` , {});
  }

  removeHall( id:any ){
    return this.hallService.delete(this.hallUrl,id);
  }

  removeShowing(hall_id: any, movie_id: any){
    return this.hallService.delete(this.hallUrl,`${hall_id}/${movie_id}`)
  }

}
