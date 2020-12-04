import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true 
}


@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http:HttpClient) { }

  get(uri:string, id: any) {
    return this.http.get(`${environment.apiUrl}/${uri}/${id}`, httpOptions)
  }

  post(uri:string, object: Object){
    console.log(object);
    return this.http.post(`${environment.apiUrl}/${uri}`, object);
  }

  delete(uri:string, id:any){
    return this.http.delete(`${environment.apiUrl}/${uri}/${id}`)
  }

  put(uri:string, id:any,object:Object){
    return this.http.put(`${environment.apiUrl}/${uri}/${id}`, object)
  }
}