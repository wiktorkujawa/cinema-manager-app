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

  getHall(name: any){
    return this.webService.get(`${this.hallUrl}/${name}`);
  }

  getShowing(title: any){
    return this.webService.get(`${this.hallUrl}/movie/${title}` );
  }

  addHall(object: object){
    return this.webService.post(this.hallUrl, object);
  }

  changeHallName(name:any, object: object){
    return this.webService.put(this.hallUrl+'/name',name, object)
  }

  addShowingToHall(name: any, object: object){
    return this.webService.put(this.hallUrl+'/taken_sessions', name, object);
  }

  moveShowing( showing_id: any, name_from: any, name_to: any){
    return this.webService.put(this.hallUrl,`${showing_id}/from/${name_from}/to/${name_to}` , {});
  }

  removeHall( name:any ){
    return this.webService.delete(this.hallUrl,name);
  }

  changeTimeofShowing(hall_name:any, showing_id:any, object: any){
    return this.webService.put(this.hallUrl+'/change_time',`${hall_name}/${showing_id}`, object);
  }
  
  removeShowing(hall_name: any, movie_id: any){
    return this.webService.delete(this.hallUrl,`${hall_name}/${movie_id}`)
  }

}
