import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_URL = "https://jmm-spring-api-h2-angular.herokuapp.com/"

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(API_URL + "users",{ responseType: 'text'})
  }

  getUserUsername(username:string): Observable<any> {
    return this.http.get(API_URL + "users/"+username)
  }


}
