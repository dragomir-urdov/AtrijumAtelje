import { Component, EventEmitter, Input, Output } from '@angular/core';

import { HeaderItem } from '@shared/models';
import { collapseExpandAnimation } from '@shared/animations';

@Component({
  selector: 'app-mobile-menu-items',
  templateUrl: './mobile-menu-items.component.html',
  animations: [collapseExpandAnimation],
})
export class MobileMenuItemsComponent {
  @Input() data!: HeaderItem[];
  @Input() currentItem!: number;

  @Output() selectItem = new EventEmitter<{ navItem: HeaderItem; index: number }>();
  @Output() navigate = new EventEmitter<string>();

  constructor() {}
}
