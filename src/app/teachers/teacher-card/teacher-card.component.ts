import { Teacher } from './../../models/teacher';
import { TeachersComponent } from './../teachers.component';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'webui-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss']
})
export class TeacherCardComponent implements OnInit {
  @Input() teacher: Teacher;
  private startDate = new Date(1980, 0, 1);
  constructor() {
   }
   username;
  ngOnInit() {
    console.log(this.username.value);
  }
  //saveChange(){}

}
