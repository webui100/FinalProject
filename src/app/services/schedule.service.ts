import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private BASE_URI = environment.APIEndpoint;

  constructor(private http: HttpClient) { }

  getSchedule(classId): Observable<any> {
    return this.http.get(`${this.BASE_URI}classes/${classId}/schedule`);
  }

}
