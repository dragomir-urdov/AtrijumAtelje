import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { NotificationService } from '@shared/services';
import { Notification, NotificationType } from '@shared/models';

import { environment } from '@environment';

@Injectable()
export class ErrorInterceptor implements ErrorHandler {
  constructor(private injector: Injector) {}

  /**
   * It handles all application errors
   *
   * @author Dragomir Urdov
   * @param error Error
   * @returns Throw error
   */
  handleError(error: any): Observable<any> {
    const notificationService = this.injector.get(NotificationService);

    this.logError(error);

    this.notify(error, notificationService);
    this.notifyDiscord(error, notificationService);

    return throwError(() => error);
  }

  /**
   * It logs error message and call stack in development environment.
   *
   * @author Dragomir Urdov
   * @param error Error
   */
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

  /**
   * It notify user about error.
   *
   * @author Dragomir Urdov
   * @param error Error
   * @param notificationService Notification Service
   */
  private notify(error: any, notificationService: NotificationService) {
    if (error instanceof HttpErrorResponse) {
      const notification = {
        title: error.statusText,
        message: error.message,
        type: NotificationType.ERROR,
      } as Notification;

      notificationService.notify(notification);
    }
  }

  /**
   * It send message to discord server when error occur in production environment.
   *
   * @author Dragomir Urdov
   * @param error Error
   * @param notificationService Notification Service
   */
  private notifyDiscord(error: any, notificationService: NotificationService) {
    if (environment.production && error instanceof HttpErrorResponse) {
      notificationService.notifyDiscordError(error.message).subscribe();
    }
  }
}
