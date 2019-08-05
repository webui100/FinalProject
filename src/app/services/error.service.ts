import { ErrorHandler, Injectable} from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class ErrorService implements ErrorHandler {
  constructor() { }

  handleError(error){
    console.log(error);
  }
}
