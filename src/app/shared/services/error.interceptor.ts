import { ErrorHandler, Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';

import { environment } from '@environment';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {
  constructor() {}

  handleError(error: any): Observable<any> {
    this.logError(error);
    return throwError(() => error);
  }

  private logError(error: any) {
    if (environment.production) {
      return;
    }

    let errorMessage = '';
    if (error.message) {
      errorMessage = error.message;
    } else if (error.status && error.statusText) {
      errorMessage = `${error.status} - ${error.statusText}`;
    } else {
      errorMessage = 'Server error';
    }

    console.warn(errorMessage, error);
  }
}
