import { ErrorHandler, Injectable, Injector} from '@angular/core';
import {Store} from '@ngrx/store';
import * as ErrorActions from '../store/error/error.actions';
import {HttpErrorResponse} from '@angular/common/http';
import {errorsSelector} from '../store/error/error.selectors';
import {NotificationService} from './notification.service';

@Injectable()

export class ErrorService implements ErrorHandler {

  constructor(private inject: Injector) {

  }

  handleError(error) {
    const store = this.inject.get(Store);
    const notify = this.inject.get(NotificationService);

    let errorList = [];
    store.select(errorsSelector).subscribe(errors => errorList = errors.errors);

    if (error instanceof HttpErrorResponse) {
      if (!errorList.some(err => JSON.stringify(err) === JSON.stringify(error))) {
        store.dispatch(ErrorActions.setErrorAction({error}));
        notify.showError(notify.errorParser(error), error);

      }
    } else {
      console.log(error);
    }


  }

}
