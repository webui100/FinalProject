<<<<<<< HEAD
import { ErrorService } from '../services/error.service';
=======
import { ErrorHandler } from '@angular/core';
>>>>>>> e636917a1091b502754505149ea033e08170384d
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptor } from './auth-interceptor';
import { ErrorService } from '../services/error.service';

/** Http interceptor providers in outside-in order */
export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  { provide: ErrorHandler, useClass: ErrorService},
];
