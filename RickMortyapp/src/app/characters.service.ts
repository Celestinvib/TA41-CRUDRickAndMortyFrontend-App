import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Character } from '../app/models/character.model';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:3000/characters';

@Injectable({
  providedIn: 'root'
})
export class CharactersService {



  constructor(private http: HttpClient) { }


  returnCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(baseUrl)
  }

  returnCharacter(id:number): Observable<Character>  {
    return this.http.get(`${baseUrl}/${id}`)
  }

  create(data: any):  Observable<any> {
    return this.http.post(baseUrl,data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`,data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}
