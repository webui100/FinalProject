import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from '../../../node_modules/jwt-decode';
// import { Observable } from 'rxjs';
// import { catchError, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { login } from '../store/login/login.actions';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ user }>
  ) {
    this.userData = store.pipe(select('user'));
  }

  private BASE_URI = environment.APIEndpoint;

  signIn(userData) {
    this.http
      .post(this.BASE_URI + 'signin', userData, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Accept: '*/*'
        }),
        observe: 'response'
      })
      .subscribe(response => {
        const token = response.headers.get('Authorization');
        const decode_token = jwt_decode(token).Roles.authority;

        localStorage.setItem('token', token);

        this.store.dispatch(login({role: decode_token}));

        if (decode_token === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else if (decode_token === 'ROLE_USER') {
          this.router.navigate(['/students']);
        } else if (decode_token === 'ROLE_TEACHER') {
          this.router.navigate(['/teachers']);
        }

        // Можливо існує кращий спосіб діставання даних з стору
        console.log(this.userData.actionsObserver._value.role);
      });
  }

  // signOut() {
  //   localStorage.removeItem('token');
  // }
}
