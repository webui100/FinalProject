import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'webui-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  daysOfWeek: string [] = [
    'Понеділок',
    'Вівторок',
    'Середа',
    'Четвер',
    "П'ятниця",
    'Субота'];
  data = [1, 2, 3, 4];
  dataSourse;
  dataHeaders: string[] = ['col'];
  lessons: string[] = ['math', 'english'];
  constructor() { }

  ngOnInit() {
    this.dataSourse = new MatTableDataSource(this.data);
  }

}
