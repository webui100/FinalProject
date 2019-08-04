import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material';

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
  currentDate = new FormControl(new Date());
  showDiary: boolean;

  constructor(
    private studentDiary: StudentDiaryService,
    private store: Store<{ diary }>,
    private dateAdapter: DateAdapter<any>
  ) {
    this.diary$ = this.store.pipe(select(selectDiary));
  }

  ngOnInit() {
    this.dateAdapter.setLocale('uk');
    const date = this.currentDate.value;

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
    this.diary$.subscribe(data => {
      this.diary = data.diary;
      this.showDiary = !!this.diary.data.length;
    });
  }

  daysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
  }

  selectNextWeek() {
    const year = this.currentDate.value.getFullYear();
    const month = this.currentDate.value.getMonth();
    const day = this.currentDate.value.getDate() + 7;
    this.currentDate = new FormControl(new Date(year, month, day));
    this.ngOnInit();
  }

  selectPreviousWeek() {
    const year = this.currentDate.value.getFullYear();
    const month = this.currentDate.value.getMonth();
    const day = this.currentDate.value.getDate() - 7;
    this.currentDate = new FormControl(new Date(year, month, day));
    this.ngOnInit();
  }

  selectCurrentWeek() {
    this.currentDate = new FormControl(new Date());
    this.ngOnInit();
  }

  selectDay() {
    this.ngOnInit();
  }

  dateFilter(date) {
    const day = date.getDay();
    return day === 1;
  }
}
