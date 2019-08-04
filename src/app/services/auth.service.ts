import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from '../../../node_modules/jwt-decode';
// import { Observable } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { login } from '../store/login/login.actions';
import { selectRole } from '../store/login/login.selectors';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  role$: any;
  role: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ user }>
  ) {
    this.role$ = this.store.pipe(select(selectRole));
  }

  private BASE_URI = environment.APIEndpoint;

  signIn(userData) {
    this.http
      .post( `${this.BASE_URI}signin`, userData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: '*/*'
        }),
        observe: 'response'
      })
      .subscribe(response => {
        const token = response.headers.get('Authorization');
        const decodeToken = jwt_decode(token).Roles.authority;

        localStorage.setItem('token', token);

        this.store.dispatch(login({ role: decodeToken }));

        if (decodeToken === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (decodeToken === 'ROLE_USER') {
          this.router.navigate(['/student']);
        } else if (decodeToken === 'ROLE_TEACHER') {
          this.router.navigate(['/teacher']);
        }


        this.role$.subscribe(data => this.role = data);
        console.log('ROLE from store --- ', this.role);
      });
  }

  // signOut() {
  //   localStorage.removeItem('token');
  // }
}
