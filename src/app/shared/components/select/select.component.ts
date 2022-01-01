import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
})
export class SelectComponent {
  @Input() overlayClass: string | string[] = [];
  @Input() closeOnSelect = false;

  isOpen = false;

  constructor() {}

  @HostListener('window:keydown', ['$event'])
  private handleEscape(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.isOpen = false;
    }
  }

  _closeOnSelect() {
    if (this.closeOnSelect) {
      this.isOpen = false;
    }
  }
}
