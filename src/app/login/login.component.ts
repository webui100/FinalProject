import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { login } from '../store/login/login.actions';

@Component({
  selector: 'webui-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  error: string;

  constructor(
    private auth: AuthService,
    private store: Store<{ login: object }>
  ) {}

  login: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  onSubmit(event): void {
    event.preventDefault();

    const data: { username: string, password: string } = {
      password: this.login.get('username').value,
      username: this.login.get('password').value
    };

    if (this.login.valid) {
      this.store.dispatch(login(data));
      this.auth.signIn();
    } else {
      this.error = 'Введіть логін та пароль';
    }
  }

  ngOnInit() {
  }
}
