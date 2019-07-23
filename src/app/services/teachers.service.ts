import { ShareService } from './../share.service';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class TeachersService {
  constructor(private http: HttpClient,
              private URL: ShareService) {}


  getTeachers() {
    return this.http
      .get(this.URL.BASE_URI + "teachers", {
        responseType: "json",
      }).pipe(
        tap(response => {
          //@ts-ignore
          return response.data;
         
        })
      )
  }
}
