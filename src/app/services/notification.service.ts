import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {HttpErrorResponse} from '@angular/common/http';
import {Store} from '@ngrx/store';
import * as ErrorActions from '../store/error/error.actions';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public snackBar: MatSnackBar, private store: Store<{ errors }>) {

  }

  showError(message: string, error: Error): void {
    const snackRef = this.snackBar.open(message, '', {
      panelClass: ['error'],
      duration: 2000
    });

    snackRef.afterDismissed().subscribe(() => {
      this.store.dispatch(ErrorActions.removeErrorAction({error}));
    });
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
        case 404:
          return 'Сторінку не знайдено';
        case 408:
          return 'Час очікування минув';
        case 500:
          return 'Помилка сервера';
        default:
          return 'Помилка';
      }
    } else {
      return 'Неопрацьована помилка';
    }
  }

}
