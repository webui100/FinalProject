import { Observable } from 'rxjs';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private BASE_URI = environment.APIEndpoint;

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<any> {
    return this.http.get(this.BASE_URI + 'teachers');
  }
}
