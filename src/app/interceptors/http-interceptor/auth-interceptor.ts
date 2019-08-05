import { TeachersService } from './../../services/teachers.service';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { StudentDiaryService } from '../../services/student-diary.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private studentDiary: StudentDiaryService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      return next.handle(
        req.clone({
          headers: req.headers.append('Authorization', token),
          responseType: 'json',
        })
      );
    }
    return next.handle(req);
  }
}
