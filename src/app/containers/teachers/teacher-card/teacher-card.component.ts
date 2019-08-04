import { TeachersService } from '../../../services/teachers.service';
import { Teacher } from '../../../models/teacher';
import { Component, OnInit, Input} from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Component({
  selector: 'webui-teacher-card',
  templateUrl: './teacher-card.component.html',
  styleUrls: ['./teacher-card.component.scss']
})
export class TeacherCardComponent implements OnInit {
  @Input() teacher: Teacher;
  data: object;
  private fileToUpload;
  avatarImg;
  private startDate = new Date(1980, 0, 1);
  private subject: Subject<string | ArrayBuffer>;
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

  handleFileInput(event) {
    this.teachServise.readFileImage(event.target);
    this.teachServise.subject.subscribe(response => {
      this.avatarImg = response;
      this.fileToUpload = response;
    });
  }

  generateDate() {
    const date = new Date(this.editTeacher.get('dateOfBirth').value);
    date.setHours(date.getHours() + 10);
    return date.toISOString().slice(0, 10);
  }

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
    this.avatarImg = this.teacher.avatar ? this.teacher.avatar : '../../../assets/images/no-user-image.png';
  }


  submitEdit($event): void {
    $event.preventDefault();
    const data = {
      avatar: this.fileToUpload ? this.fileToUpload : this.teacher.avatar,
      firstname: this.editTeacher.get('firstname').value,
      lastname: this.editTeacher.get('lastname').value,
      patronymic: this.editTeacher.get('patronymic').value,
      dateOfBirth: this.generateDate(),
      email: this.editTeacher.get('email').value,
      phone: this.editTeacher.get('phone').value,
      login: this.editTeacher.get('login').value,
      oldPass: '',
      newPass: '',
      id: this.teacher.id
    };
    this.teachServise.editTeacher(this.teacher.id, data);
  }

  ngOnDestroy(): void {
   this.teachServise.subject.unsubscribe();
  }
}
