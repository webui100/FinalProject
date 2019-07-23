import { ShareService } from './../share.service';
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  
  constructor(private http: HttpClient,
              private URL: ShareService) {}
  
  

  signIn(userData) : Observable<any>{
    return this.http
      .post(this.URL.BASE_URI + "signin", userData, {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Accept": "*/*"
        }),
        observe: "response",
        responseType: "json"
      }).pipe(catchError(this.handleError<any[]>('signed in', [])));
    } 

  signOut(){
    localStorage.removeItem('token');
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      // this.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
