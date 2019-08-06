import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Store } from "@ngrx/store";
import { subjectAction } from '../store/subjects/subjects.action';


@Injectable({
    providedIn: "root"
  })
export class SubjectsService{
    private BASE_URI = environment.APIEndpoint;

    constructor(private http: HttpClient,
    private store: Store<{subjects}>){ }

    getSubjects() { 
        return this.http.get(`${this.BASE_URI}subjects`)
        .subscribe(response => {
          //@ts-ignore
          this.store.dispatch(subjectAction({ data: response.data }));
        });
      }
      ngOnInit(): void {
  }
}