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
  constructor(private auth: AuthService, 
              private errorMessage: ErrorService) {}

  login: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  onSubmit(event) {
    event.preventDefault();

    let username = this.login.get("username").value;
    let password = this.login.get("password").value;
    
    if(this.login.valid){
    this.auth.login(username, password)
    }
  }

  ngOnInit() {}
}
