import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TeachersService {
  _URI = "http://35.228.86.127:8080/";
  teachersList;

  constructor(private http: HttpClient) {}

  getTeachers() {
    return this.http
      .get(this._URI + "teachers", {
        responseType: "json"
      })
      .subscribe(response => {
        //@ts-ignore
        this.teachersList = response.data;
        console.log(this.teachersList);
        return this.teachersList
      });
  }
}
