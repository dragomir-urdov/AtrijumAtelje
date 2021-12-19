import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fadeAnimation = trigger('fade', [
  state('in', style({ opacity: 1 })),
  transition(':enter', [style({ opacity: 0 }), animate(200)]),
  transition(':leave', animate(400, style({ opacity: 0 }))),
]);
