import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';

import { StudentDiaryService } from '../../services/student-diary.service';
import { selectDiary } from '../../store/diary/diary.selectors';

@Component({
  selector: 'webui-student-diary',
  templateUrl: './student-diary.component.html',
  styleUrls: ['./student-diary.component.scss']
})
export class StudentDiaryComponent implements OnInit {
  diary$: any;
  diary: any;
  weekDays: string[] = [
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    'П\'ятниця'
  ];
  dayNumbers: number[];
  currentDate: any = new Date();

  constructor(
    private studentDiary: StudentDiaryService,
    private store: Store<{ diary }>
  ) {
    this.diary$ = this.store.pipe(select(selectDiary));
  }

  ngOnInit() {
    const date = this.currentDate;
    const weekDaysPassed = date.getDay() > 0 ? date.getDay() - 1 : date.getDay() + 6;
    date.setDate(date.getDate() - weekDaysPassed);

    const year = date.getFullYear();
    const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    const dayNumbers = [];
    const daysInMonth = this.daysInMonth(year, month);
    this.weekDays.map((item, i) => {
      if (+day + i <= daysInMonth) {
        dayNumbers.push(+day + i);
      } else {
        dayNumbers.push(+day + i - daysInMonth);
      }
    });
    this.dayNumbers = dayNumbers;

    this.studentDiary.fetchStudentDiary(`${year}-${month}-${day}`);
    this.diary$.subscribe(data => this.diary = data.diary);
  }

  daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  selectNextWeek() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const day = this.currentDate.getDate() + 7;
    this.currentDate = new Date(year, month, day);
    this.ngOnInit();
  }

  selectPreviousWeek() {
    const year = this.currentDate.getFullYear();
    const month = this.currentDate.getMonth();
    const day = this.currentDate.getDate() - 7;
    this.currentDate = new Date(year, month, day);
    this.ngOnInit();
  }

  selectCurrentWeek() {
    this.currentDate = new Date();
    this.ngOnInit();
  }

  showDiary() {
    console.log(this.diary);
    console.log(this.weekDays);
    console.log(this.dayNumbers);
    console.log(this.currentDate);
  }
}
