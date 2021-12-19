export interface Notification {
  title?: string;
  message: string;
  dismissible?: boolean;
  type: 'success' | 'warn' | 'error';
}
