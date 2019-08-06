import { Component, OnInit, Input } from "@angular/core";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { StudentsService } from "../../../services/students.service";
import { Student } from "../../../models/students";
import { ValidationService } from "../../../services/validation.service";

@Component({
  selector: "webui-student-detail",
  templateUrl: "./student-detail.component.html",
  styleUrls: ["./student-detail.component.scss"]
})
export class StudentDetailComponent implements OnInit {
  @Input() student: Student;
  selectedFile;

  constructor(
    private studentsService: StudentsService,
    private formValidation: ValidationService
  ) {}

  updateStudent: FormGroup = new FormGroup({
    avatar: new FormControl(""),
    dateOfBirth: new FormControl("", Validators.required),
    login: new FormControl("", [
      Validators.required,
      Validators.pattern(this.formValidation.loginRegExp)
    ]),
    firstname: new FormControl("", [
      Validators.required,
      Validators.pattern(this.formValidation.ukrNameRegExp)
    ]),
    lastname: new FormControl("", [
      Validators.required,
      Validators.pattern(this.formValidation.ukrNameRegExp)
    ]),
    patronymic: new FormControl("", [
      Validators.required,
      Validators.pattern(this.formValidation.ukrNameRegExp)
    ]),
    email: new FormControl("", [
      Validators.pattern(this.formValidation.emailRegExp)
    ]),
    phone: new FormControl("", [
      Validators.pattern(this.formValidation.phoneRegExp)
    ])
  });
  //Event hendler for encrypt img to BASE64
  onFileSelected(event) {
    this.studentsService.encImage(event);
    this.studentsService.subject.subscribe(res => {
      console.log(res);
      this.selectedFile = res;
    });
  }
  // Event hendler for editing student
  onSumbit($event) {
    $event.preventDefault();
    const data = {
      firstname: this.updateStudent.get("firstname").value,
      avatar: this.selectedFile ? this.selectedFile : this.student.avatar,
      dateOfBirth: this.studentsService.generateDate(
        this.updateStudent,
        "dateOfBirth"
      ),
      login: this.updateStudent.get("login").value,
      oldPass: "",
      newPass: "",
      lastname: this.updateStudent.get("lastname").value,
      patronymic: this.updateStudent.get("patronymic").value,
      email: this.updateStudent.get("email").value,
      phone: this.updateStudent.get("phone").value,
      id: this.student.id
    };

    this.studentsService.updateStudentData(data);
  }
  setValue() {
    this.updateStudent.setValue({
      dateOfBirth: this.student.dateOfBirth,
      login: this.student.login,
      firstname: this.student.firstname,
      lastname: this.student.lastname,
      patronymic: this.student.patronymic,
      email: this.student.email,
      phone: this.student.phone,
      avatar: this.student.avatar
    });
  }

  ngOnInit() {
    this.setValue();
  }
}
