import { Component } from '@angular/core';

import { NotificationService } from '@shared/services';

import { fadeAnimation } from '@shared/animations';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  animations: [fadeAnimation],
})
export class NotificationComponent {
  notification$ = this.notificationService.notification$;

  constructor(private notificationService: NotificationService) {}
}
