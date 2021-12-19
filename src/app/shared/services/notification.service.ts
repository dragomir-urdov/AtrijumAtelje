import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { CommonService } from '@shared/services';

import { Notification } from '@shared/models';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  public notification$ = new BehaviorSubject<Notification | null>(null);

  private timer: any;

  constructor(private commonService: CommonService) {}

  public notify(notification: Notification) {
    if (this.timer) {
      clearTimeout(this.timer);
    }

    this.notification$.next(notification);

    this.timer = setTimeout(() => {
      this.notification$.next(null);
    }, 3000);
  }
}
