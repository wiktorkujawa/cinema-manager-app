import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  }),
  withCredentials: true
}

const imdbHeaders = {
  headers: new HttpHeaders({
    'x-rapidapi-key': 'a16322f6admsh01988b356dbb0cfp1d6770jsn9b2faae37767',
    'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
  })
}


@Injectable({
  providedIn: 'root'
})
export class WebService {

  constructor(private http:HttpClient) { }

  get(uri:string, id: any) {
    return this.http.get<any[]>(`${environment.apiUrl}/${uri}/${id}`, httpOptions)
  }
  
  getImdb(name: string){
    return this.http.get(`https://movie-database-imdb-alternative.p.rapidapi.com/?s=${name}&page=1&r=json`, imdbHeaders)
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