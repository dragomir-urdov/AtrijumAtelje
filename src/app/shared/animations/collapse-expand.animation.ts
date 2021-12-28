import { animate, state, style, transition, trigger } from '@angular/animations';

export const collapseExpandAnimation = trigger('collapseExpand', [
  state('void', style({ height: '0px' })),
  state('enter', style({ height: '100%' })),
  state('leave', style({ height: '0px' })),
  transition('* => *', animate('500ms cubic-bezier(0.25, 0.8, 0.25, 1)')),
]);
