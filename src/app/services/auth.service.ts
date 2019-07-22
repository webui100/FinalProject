import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  token;
  _URI = "http://35.228.86.127:8080/";

  constructor(private http: HttpClient) {}

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
  }
}
