import { TeachersService } from './../../../services/teachers.service';
import { Teacher } from '../../../models/teacher';
import { TeachersComponent } from '../teachers.component';
import { Component, OnInit, Input } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'webui-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss']
})
export class TeacherCardComponent implements OnInit {
  @Input() teacher: Teacher;
  data: object;
  private startDate = new Date(1980, 0, 1);
  constructor(private teachServise: TeachersService) {}
  editTeacher: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    patronymic: new FormControl(''),
    dateOfBirth: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(''),
    login: new FormControl('')
  });

  ngOnInit() {
    this.editTeacher.setValue({
      firstname: this.teacher.firstname,
      lastname: this.teacher.lastname,
      patronymic: this.teacher.patronymic,
      dateOfBirth: this.teacher.dateOfBirth,
      email: this.teacher.email,
      phone: this.teacher.phone,
      login: this.teacher.login
    });
  }


  submitEdit($event): void {
    $event.preventDefault();
    const data = {
      avatar: '',
      firstname: this.editTeacher.get('firstname').value,
      lastname: this.editTeacher.get('lastname').value,
      patronymic: this.editTeacher.get('patronymic').value,
      dateOfBirth: this.editTeacher.get('dateOfBirth').value,
      email: this.editTeacher.get('email').value,
      phone: this.editTeacher.get('phone').value,
      login: this.editTeacher.get('login').value,
      oldPass: '',
      newPass: '',
      id: this.teacher.id
    };
    this.teachServise.editTeacher(this.teacher.id, data);
  }
}
