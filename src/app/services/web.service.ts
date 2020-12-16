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

  get(uri:string) {
    return this.http.get<any[]>(`${environment.apiUrl}/${uri}`, httpOptions)
  }

  post(uri:string, object: any){
    return this.http.post(`${environment.apiUrl}/${uri}`, object, httpOptions);
  }

  delete(uri:string, id:any){
    return this.http.delete(`${environment.apiUrl}/${uri}/${id}`)
  }

  put(uri:string, id:any,object:object){
    return this.http.put(`${environment.apiUrl}/${uri}/${id}`, object, httpOptions)
  }
}