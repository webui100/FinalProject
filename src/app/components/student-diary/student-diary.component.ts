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

  constructor(
    private studentDiary: StudentDiaryService,
    private store: Store<{ diary }>
  ) {
    this.diary$ = this.store.pipe(select(selectDiary));
  }

  ngOnInit() {
    const date = new Date();
    const weekDaysPassed = date.getDay() - 1;
    date.setDate(date.getDate() - weekDaysPassed);
    const year = date.getFullYear();
    const month = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : `${date.getMonth() + 1}`;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : `${date.getDate()}`;

    this.studentDiary.fetchStudentDiary(`${year}-${month}-${day}`);
    this.diary$.subscribe(data => this.diary = data.diary);
  }

  showDiary() {
    console.log(this.diary);
    console.log(this.weekDays);
  }
}
