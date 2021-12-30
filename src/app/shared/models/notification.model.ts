export interface Notification {
  title?: string;
  message: string;
  dismissible?: boolean;
  type: NotificationType;
}

export enum NotificationType {
  SUCCESS = 'success',
  WARN = 'warn',
  ERROR = 'error',
}
