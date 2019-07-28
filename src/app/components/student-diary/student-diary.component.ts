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

  constructor(
    private studentDiary: StudentDiaryService,
    private store: Store<{ diary }>
  ) {
    this.diary$ = this.store.pipe(select(selectDiary));
  }

  ngOnInit() {
    const date = new Date(2019, 4, 17);
    const weekDaysPassed = date.getDay() > 0 ? date.getDay() - 1 : date.getDay() + 6;
    date.setDate(date.getDate() - weekDaysPassed);

    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    const dayNumbers = [];
    this.weekDays.map((item, i) => dayNumbers.push(+day + i));
    this.dayNumbers = dayNumbers;

    this.studentDiary.fetchStudentDiary(`${year}-${month}-${day}`);
    this.diary$.subscribe(data => this.diary = data.diary);
  }

  showDiary() {
    console.log(this.diary);
    console.log(this.weekDays);
    console.log(this.dayNumbers);
  }
}
