import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import * as jwt_decode from '../../../node_modules/jwt-decode';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectLogin } from '../store/login/login.selector';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData$: Observable<string>;
  userData: string;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<{ user }>
  ) {
    this.userData$ = store.pipe(select('user'));
  }

  private BASE_URI = environment.APIEndpoint;


  signIn(userData) {
    this.userData$.subscribe(data => this.userData = data);
    console.log(this.userData);
    this.http
      .post(this.BASE_URI + "signin", userData, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          Accept: "*/*"
        }),
        observe: "response"
      })
      .subscribe(response => {
        const token = response.headers.get("Authorization");
        const decode_token = jwt_decode(token).Roles.authority;
        localStorage.setItem("token", token);

        if (decode_token === "ROLE_ADMIN") {
          this.router.navigate(["/admin"]);
        } else if (decode_token === "ROLE_USER") {
          this.router.navigate(["/students"]);
        } else if (decode_token === "ROLE_TEACHER") {
          this.router.navigate(["/teachers"]);
        }
      });
  }

  signOut() {
    localStorage.removeItem("token");
  }
}
