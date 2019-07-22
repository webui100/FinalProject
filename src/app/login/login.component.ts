import { Router } from "@angular/router";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "webui-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  error;
  token;
  constructor(private auth: AuthService, private router: Router) {}

  login: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  onSubmit(event) {
    event.preventDefault();

    let username = this.login.get("username").value;
    let password = this.login.get("password").value;
    
    try {
      this.auth.login(username, password).subscribe(response => {
        if (response.status == 204) {
          this.token = response.headers.get("Authorization");
          this.router.navigate(["/teachers"]);
        }
      });
    } catch (error) {
      this.error = error;
    }
  }

  ngOnInit() {}
}
