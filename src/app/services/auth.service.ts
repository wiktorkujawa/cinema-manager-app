import { Injectable } from '@angular/core';
import { WebService } from './web.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private webService: WebService) { }

  login( data: any){
    return this.webService.post('auth/login', data);
  }

  register( data: any ){
    return this.webService.post('auth/register', data);
  }

  logout(){
    return this.webService.get('auth/logout','');
  }

  getUser(){
    return this.webService.get('auth/user','');
  }
}
