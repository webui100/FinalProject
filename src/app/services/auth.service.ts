import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  token;

  _URI = "http://35.228.86.127:8080/";
  
  constructor(private http: HttpClient,
              private router: Router) {}
  login(login, password) {
    const data = JSON.stringify({
      password: login,
      username: password
    });

    return this.http
      .post(this._URI + "signin", data, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept": "*/*"
        }),
        observe: "response",
        responseType: "json"
      })
      .subscribe(response => {
        if (response.status == 204) {
          this.token = response.headers.get("Authorization");
          localStorage.setItem('token', this.token);
          this.router.navigate(["/teachers"]);
        }
      });
  }
}
