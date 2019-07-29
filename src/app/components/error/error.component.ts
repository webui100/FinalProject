import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {select, Store} from '@ngrx/store';
import {errorsSelector} from '../../store/error/error.selectors';
import {Observable} from 'rxjs';
import * as ErrorActions from '../../store/error/error.actions';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'webui-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  errors$: Observable<any>;
  errorsArray: Error [];

  constructor(private auth: AuthService, private store: Store<{ errors }>) {
    this.errors$ = this.store.select(errorsSelector);
  }

  ngOnInit() {
    this.errors$.subscribe(data => this.errorsArray = data.errors);
  }

  removeError(error) {
    this.store.dispatch(ErrorActions.removeErrorAction({error}));
  }

  closeError(e, error) {
    e.target.parentNode.parentNode.classList.add('error-destroy');
    setTimeout(() => this.removeError(error), 180);
  }

  errorParser(error: Error) {
    if (error instanceof HttpErrorResponse) {
      if (error.status === 0) {
        return 'Битий токен';
      }
      switch (error.error.status.code) {
        case 400:
          return 'Невірний логін або пароль';
        case 401:
          return 'Помилка авторизації';
        case 403:
          return 'Доступ заборонено';
        case 408:
          return 'Час очікування минув';
        default:
          return 'Помилка';
      }
    } else {
      return 'Undefined error';
    }
  }

}
