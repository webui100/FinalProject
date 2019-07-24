import { AuthService } from "../services/auth.service";
import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from '../store/login/login.actions';

@Component({
  selector: "webui-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  error: string;
  // userData: Observable<object>;

  constructor(
    private auth: AuthService,
    private store: Store<{ login: object }>
  ) {
    // this.userData = store.pipe(select('login'));
  }

    login: FormGroup = new FormGroup({
    username: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  onSubmit(event): void {
    event.preventDefault();

    const data: { username: string, password: string } = {
      password: this.login.get("username").value,
      username: this.login.get("password").value
    };

    this.store.dispatch(login(data));

    // console.log(this.userData);

    if (this.login.valid) {
      this.auth.signIn(data)
    } else {
      this.error = "Введіть логін та пароль"
    }
  }

  ngOnInit() {
  }
}
