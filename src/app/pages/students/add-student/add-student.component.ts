import { Component, OnInit, Input } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormGroupDirective,
  NgForm,
  Validators
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

import { StudentsService } from "../../../services/students.service";
import { ValidationService } from "../../../services/validation.service";
import { Student } from "../../../models/students";

@Component({
  selector: "webui-add-student",
  templateUrl: "./add-student.component.html",
  styleUrls: ["./add-student.component.scss"]
})
export class AddStudentComponent implements OnInit {
  @Input() student: Student;
  selectedFile;

  constructor(
    private studentsService: StudentsService,
    private formValidation: ValidationService
  ) {}
  onFileSelected(event) {
    this.studentsService.encImage(event);
    this.studentsService.subject.subscribe(res => {
      this.selectedFile = res;
    });
  }

  addStudentForm: FormGroup = new FormGroup({
    avatar: new FormControl(""),
    dateOfBirth: new FormControl("", Validators.required),

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
  resetValues() {
    this.addStudentForm.setValue({
      dateOfBirth: "",
      firstname: "",
      lastname: "",
      patronymic: "",
      email: "",
      phone: "",
      avatar: ""
    });
  }
  onAdd($event) {
    $event.preventDefault();
    const data = {
      firstname: this.addStudentForm.get("firstname").value,
      avatar: this.selectedFile,
      dateOfBirth: this.studentsService.generateDate(
        this.addStudentForm,
        "dateOfBirth"
      ),
      classId: 17,
      login: "",
      oldPass: "",
      newPass: "",
      lastname: this.addStudentForm.get("lastname").value,
      patronymic: this.addStudentForm.get("patronymic").value,
      email: this.addStudentForm.get("email").value,
      phone: this.addStudentForm.get("phone").value,
      id: 0
    };

    this.studentsService.addStudent(data);
  }
  ngOnInit() {}
}
