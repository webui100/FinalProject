import { TeachersService } from './../../../services/teachers.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'webui-teacher-create',
  templateUrl: './teacher-create.component.html',
  styleUrls: ['./teacher-create.component.scss']
})
export class TeacherCreateComponent implements OnInit {
  private startDate = new Date(1980, 0, 1);
  constructor(private teachServise: TeachersService) { }

  addTeacher: FormGroup = new FormGroup({
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    patronymic: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    email: new FormControl(''),
    phone: new FormControl(''),
    login: new FormControl('', Validators.required),
    avatar: new FormControl(null)
  });
  ngOnInit() {
  }

  submitAdd($event): void {
    $event.preventDefault();
    const data = {
      avatar: '',
      firstname: this.addTeacher.get('firstname').value,
      lastname: this.addTeacher.get('lastname').value,
      patronymic: this.addTeacher.get('patronymic').value,
      dateOfBirth: this.addTeacher.get('dateOfBirth').value.toISOString().slice(0, 10),
      email: this.addTeacher.get('email').value,
      phone: this.addTeacher.get('phone').value,
      login: this.addTeacher.get('login').value,
    };
    this.teachServise.addTeacher(data);
  }

}
