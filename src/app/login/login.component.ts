
import { ErrorService } from './../services/error.service';
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";


@Component({
  selector: "webui-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  error: string;
  constructor(private auth: AuthService) {}

  login: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  onSubmit(event): void {
    event.preventDefault();

    const data: object = {
      password: this.login.get("username").value,
      username: this.login.get("password").value
    };

    if(this.login.valid){
    this.auth.signIn(data)
    }else{
      this.error = "Введіть логін та пароль"
    }
  }

  ngOnInit() {}
}
