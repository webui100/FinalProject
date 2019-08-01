import { NotificationService } from './notification.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { teacherAction } from '../store/teachers/teachers.action';


@Injectable({
  providedIn: 'root'
})
export class TeachersService {

  private BASE_URI = environment.APIEndpoint;

  constructor(private http: HttpClient,
              private store: Store<{teacherState}>,
              private notify: NotificationService) {
  }

  getTeachers() {
    return this.http.get(`${this.BASE_URI}teachers`)
    .subscribe(response => {
      // @ts-ignore
      this.store.dispatch(teacherAction({ data: response.data }));
    });
  }

  editTeacher(teacherId, data) {
    return this.http.put(`${this.BASE_URI}admin/teachers/${teacherId}`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        'Access-Control-Allow-Origin':	'*'
      }),
      observe: 'response'
    })
    .subscribe( (response) => {
      if (response.status === 200) {
        this.notify.notifySuccess('Успішно редаговано');
        this.getTeachers();
      } else {
        this.notify.notifyFailure('Упс...щось пішло не так');
      }
    });
  }

  addTeacher(data) {
    return this.http.post(`${this.BASE_URI}teachers`, data,
    {
      observe: 'response'
    })
    .subscribe( (response) => {
      console.log(response.status === 200);
      if (response.status === 200) {
        this.notify.notifySuccess('Успішно створено');
        this.getTeachers();
      } else {
        this.notify.notifyFailure('Упс...щось пішло не так');
      }
    });
  }
}
