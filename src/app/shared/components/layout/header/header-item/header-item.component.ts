import { Component, Input } from '@angular/core';

import { HeaderItem } from '@shared/models';

@Component({
  selector: 'app-header-item',
  templateUrl: './header-item.component.html',
})
export class HeaderItemComponent {
  @Input() headerItem!: HeaderItem;

  constructor() {}
}
