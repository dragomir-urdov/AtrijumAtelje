import { Component, Inject } from '@angular/core';

import { MODAL_DATA } from '@shared/services';

import { fadeAnimation } from '@shared/animations';
import { Notification } from '@shared/models';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  animations: [fadeAnimation],
})
export class NotificationComponent {
  constructor(@Inject(MODAL_DATA) public notification: Notification) {}
}
