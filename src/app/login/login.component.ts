import { Router } from '@angular/router';
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
  token;
  error;
  constructor(private auth: AuthService, private router: Router) {}

  login: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  onSubmit(event) {
    event.preventDefault();

    const data = JSON.stringify({
      password: this.login.get("username").value,
      username: this.login.get("password").value
    });

    if(this.login.valid){
    this.auth.signIn(data)
      .subscribe(response => {
        let token = response.headers.get('Authorization')
        localStorage.setItem('token', token);
        this.router.navigate(["/teachers"]);
      })
    }else{
      this.error = "Введіть логін та пароль"
    }
  }

  ngOnInit() {}
}
