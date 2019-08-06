import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DateAdapter } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';
import { addDays, format, getDate, getDay, getDaysInMonth, setDate, subDays } from 'date-fns';

import { StudentDiaryService } from '../../services/student-diary.service';
import { selectDiary } from '../../store/diary/diary.selectors';
import { Diary } from '../../store/diary/diary.reducer';

@Component({
  selector: 'webui-student-diary',
  templateUrl: './student-diary.component.html',
  styleUrls: ['./student-diary.component.scss']
})
export class StudentDiaryComponent implements OnInit {
  diary?: Diary;
  dateValue: any = StudentDiaryComponent.getStartOfWeek();
  weekDays: string[] = ['Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця'];
  dayNumbers: number[];
  showDiary: boolean;

  constructor(
    private studentDiary: StudentDiaryService,
    private store: Store<{ diary }>,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.store.pipe(select(selectDiary)).subscribe(data => {
      this.diary = data.diary;
      this.showDiary = data.diary && !!this.diary.data.length;
    });
  }

  static getStartOfWeek() {
    const today = new Date();
    const weekDaysPassed = getDay(today) - 1;
    return setDate(today, getDate(today) - weekDaysPassed);
  }

  ngOnInit() {
    registerLocaleData(localeUk);
    this.dateAdapter.setLocale('uk');
    this.dateAdapter.getFirstDayOfWeek = () => 1;
    this.fetchDiary();
  }

  fetchDiary() {
    const date = this.dateValue;

    const formattedDate = format(
      new Date(date),
      'YYYY-MM-DD'
    );

    const dayNumbers = [];
    const daysInMonth = getDaysInMonth((new Date(date)));
    this.weekDays.map((item, i) => {
      if (getDate(new Date(date)) + i <= daysInMonth) {
        dayNumbers.push(getDate(new Date(date)) + i);
      } else {
        dayNumbers.push(getDate(new Date(date)) + i - daysInMonth);
      }
    });
    this.dayNumbers = dayNumbers;

    this.studentDiary.fetchStudentDiary(formattedDate);
  }

  selectPreviousWeek() {
    this.dateValue = subDays(new Date(this.dateValue), 7);
    this.fetchDiary();
  }

  selectNextWeek() {
    this.dateValue = addDays(new Date(this.dateValue), 7);
    this.fetchDiary();
  }

  selectCurrentWeek() {
    this.dateValue = StudentDiaryComponent.getStartOfWeek();
    this.fetchDiary();
  }

  selectDay() {
    this.fetchDiary();
  }

  dateFilter(date) {
    const day = date.getDay();
    return day === 1;
  }
}
