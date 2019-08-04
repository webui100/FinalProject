import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {count, filter, map, mergeMap, reduce, switchMap} from 'rxjs/operators';
import {from, Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import * as ChartActions from '../store/chart/chart.actions';
import {Data} from '../models/chart.model';
import {Chart} from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class AdminPanelService {
  private uri = environment.APIEndpoint;

  constructor(private http: HttpClient, private store: Store<{chart}>) {
  }

  getTeachersNumber(): Observable<number> {
    return this.http.get(this.uri + 'teachers').pipe(
      switchMap((value: Response) => from(value.data)),
      filter((value: Response) => value.isActive !== false),
      count()
    );
  }

  getSubjectsNumber(): Observable<number> {
    return this.http.get(this.uri + 'subjects').pipe(
      switchMap((value: Response) => from(value.data)),
      count()
    );
  }

  getStudentsNumber(): Observable<number> {
    // return this.http.get(this.uri + 'classes').pipe(
    //   switchMap((value: Response) => from(value.data)),
    //   filter((value: Response) => value.isActive !== false),
    //   mergeMap(value => this.http.get(this.uri + 'students/classes/' + value.id)),
    //   switchMap((value: Response) => from(value.data)),
    //   count()
    // );

    return this.http.get(this.uri + 'classes').pipe(
      switchMap((value: Response) => from(value.data)),
      filter((value: Response) => value.isActive !== false),
      reduce((acc, value: Response) => acc + value.numOfStudents, 0)
    );
  }


  getClassesNumber(): Observable<number> {
    return this.http.get(this.uri + 'classes').pipe(
      switchMap((value: Response) => from(value.data)),
      filter((value: Response) => value.isActive !== false),
      count()
    );
  }

  getStudentsFromClass(classname: string) {
    const regex = new RegExp(`^${classname}[-(а-я]`, 'i');
    return this.http.get(this.uri + 'classes')
    .pipe(
      switchMap((value: Response) => from(value.data)),
      filter((value: Response) => value.isActive !== false),
      filter((value) => regex.test(value.className)),
      reduce((acc, value: Response) => {
        acc.push({
          data: [value.numOfStudents],
          label: value.className
        });
        return acc;
      }, [])
    );
  }


  generateChart(data: Array<Data>) {
    this.store.dispatch(ChartActions.setChartData({data}));
  }

  setChartType(chartType: string) {
    this.store.dispatch(ChartActions.setCartType({chartType}));
  }


}


interface Response {
  data: Array<object>;
  id: number;
  isActive: boolean;
  numOfStudents: number;
  className: string;
}
