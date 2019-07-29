import { ErrorHandler, Injectable, Injector} from '@angular/core';
import {Store} from '@ngrx/store';
import * as ErrorActions from '../store/error/error.actions';


@Injectable()

export class ErrorService implements ErrorHandler {

  constructor(private inject: Injector) {

  }

  handleError(error) {
    const store = this.inject.get(Store);

    store.dispatch(ErrorActions.setErrorAction({error}));

  }

}
