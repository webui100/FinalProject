import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { ScheduleService } from 'src/app/services/schedule.service';
import { Store, select } from '@ngrx/store';
import { TeachersService } from 'src/app/services/teachers.service';
import { tap, startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import initialSchedule from './initial-schedule';
import { selectRole } from 'src/app/store/login/login.selectors';
import { selectTeachers } from 'src/app/store/teachers/teachers.selector';

// import { reducers } from '../../store/index';

@Component({
  selector: 'webui-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  daysOfWeek = initialSchedule;
  data = [1, 2, 3, 4];
  dataSourse;
  dataHeaders: string[] = ['col'];
  lessons: string[] = ['math', 'english'];

  teacher = new FormControl();
  term = new FormControl();
  chosenClass = new FormControl();
  year = new FormControl();
  teachers: string[] = [];
  teachersTemp = [];
  terms: string[] = ['1', '2'];
  classes: string[] = ['1-А', '2-Б', '3-В'];
  years: number[] = [];
  currentYear = (new Date()).getFullYear();
  filteredTeachers: Observable<string[]>;
  filteredTerm: Observable<string[]>;
  filteredClasses: Observable<string[]>;
  filteredYears: Observable<string[]>;

  // teachersFromStore$: Observable <any>;

  constructor(private schedule: ScheduleService,
              private teachersObj: TeachersService,
              private store: Store<{ teachers }>) { }

  ngOnInit() {

    this.store.select(selectTeachers)
      .subscribe(
        res =>  console.log(res.data)
      );

    // this.teachersTemp.forEach(teacher => console.log(teacher)
    //   // this.teachers.push(
    //   // `${teacher.lastname} ${teacher.firstname} ${teacher.patronymic} ${teacher.id}`
    // );


    this.dataSourse = new MatTableDataSource(this.data);
    this.schedule.getSchedule(16); // .subscribe(res => console.log(res.data.classId));
    this.teachersObj.getTeachers();
    // .pipe(
    //   tap(res => res.data.forEach(teacher => this.teachers.push(
    //     `${teacher.lastname} ${teacher.firstname} ${teacher.patronymic} ${teacher.id}`
    //   ))))
    // .subscribe();
    if (!this.years.length) {
      for (let i = -5; i <= 5; i++) {
        this.years.push((this.currentYear + i));
      }
    }

    this.filteredTeachers = this.teacher.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.teachers))
      );
    this.filteredTerm = this.term.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.terms))
      );
    this.filteredClasses = this.chosenClass.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.classes))
      );
    this.filteredYears = this.year.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value.toString(), this.years))
      );
  }

  displayFn(user?: string): string | undefined {
    return user ? user : undefined;
  }

  private _filter(value: string, arr: any[]): string[] {
    const filterValue = value.toLowerCase();
    if (typeof (arr[0]) === 'number') {
      arr.map((item, index) => arr[index] = item.toString());
    }
    return arr.filter(option => option.toLowerCase().includes(filterValue));
  }

  // addSubject() {

  // }

  onSubmit() {
    console.log(parseInt(this.year.value));
  }
}
