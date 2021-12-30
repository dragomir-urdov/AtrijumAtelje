import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, take, catchError, of, EMPTY } from 'rxjs';

import { Notification } from '@shared/models';
import { CommonService, ModalService, ModalRef } from '@shared/services';
import { NotificationComponent } from '@shared/components';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private timer: any;
  private notificationRef?: ModalRef;

  constructor(private http: HttpClient, private commonService: CommonService, private modalService: ModalService) {}

  /**
   * It show notification.
   *
   * @author Dragomir Urdov
   * @param notification Notification data.
   */
  public notify(notification: Notification) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.notificationRef = this.modalService.open(NotificationComponent, notification);

    this.timer = setTimeout(() => {
      this.notificationRef?.close();
    }, 3000);
  }

  /**
   * It send message to discord server.
   *
   * @author Dragomir Urdov
   * @param error Error
   * @returns Response
   */
  public notifyDiscordError(error: string): Observable<any | never> {
    const discordURI = this.commonService.config.discord.errorWebhook;
    const username = this.commonService.config.discord.username;

    const req = {
      username,
      content: error,
    };

    return this.http.post(discordURI, req).pipe(
      take(1),
      catchError((error) => of(EMPTY))
    );
  }
}
