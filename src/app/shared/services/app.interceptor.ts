import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { NotificationService } from '@shared/services';
import { Notification } from '@shared/models';

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  constructor(
    private translateService: TranslateService,
    private notificationService: NotificationService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets/')) {
      request = this.setLangHeader(request);
    }

    return next.handle(request).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => {
          if (
            event instanceof HttpResponse &&
            event.url?.includes('/assets/')
          ) {
            // Any additional post-processing for the response goes here.
          }
        },
        error: (error: HttpErrorResponse) => {
          if (!error.url?.includes('/assets/')) {
            this.handleError(error);
          }
        },
      })
    );
  }

  private setLangHeader(request: HttpRequest<unknown>): HttpRequest<unknown> {
    let newReq = request;

    if (!request.headers.has('Content-Language')) {
      newReq = request.clone({
        headers: request.headers.set(
          'Content-Language',
          this.translateService.currentLang
        ),
      });
    }

    return newReq;
  }

  private handleError(error: HttpErrorResponse) {
    const notification = {
      title: error.statusText,
      message: error.message,
      type: 'error',
    } as Notification;

    this.notificationService.notify(notification);
  }
}
