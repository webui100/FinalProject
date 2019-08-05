import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { DateAdapter } from '@angular/material';
import { addDays, format, getDate, getDay, getDaysInMonth, setDate, subDays } from 'date-fns';

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
  dateValue = this.getStartOfWeek();
  weekDays: string[] = [
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    'П\'ятниця'
  ];
  dayNumbers: number[];
  showDiary: boolean;

  constructor(
    private studentDiary: StudentDiaryService,
    private store: Store<{ diary }>,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.diary$ = this.store.pipe(select(selectDiary));
  }

  ngOnInit() {
    this.dateAdapter.setLocale('uk');
    this.dateAdapter.getFirstDayOfWeek = () => 1;

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
    this.diary$.subscribe(data => {
      this.diary = data.diary;
      this.showDiary = !!this.diary.data.length;
    });
  }

  getStartOfWeek() {
    const today = new Date();
    const weekDaysPassed = getDay(today) - 1;
    return setDate(today, getDate(today) - weekDaysPassed);
  }

  selectPreviousWeek() {
    this.dateValue = subDays(new Date(this.dateValue), 7);
    this.ngOnInit();
  }

  selectNextWeek() {
    this.dateValue = addDays(new Date(this.dateValue), 7);
    this.ngOnInit();
  }

  selectCurrentWeek() {
    this.dateValue = new Date();
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
