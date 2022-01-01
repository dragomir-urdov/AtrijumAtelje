import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appClickOutside]',
})
export class ClickOutsideDirective {
  @Input() prevent?: ElementRef;

  @Output() clickOutside = new EventEmitter<void>();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('document:mousedown', ['$event.target'])
  private onClick(target: any) {
    if (
      !this.elementRef.nativeElement.contains(target) &&
      !(this.prevent && this.prevent?.nativeElement.contains(target))
    ) {
      this.clickOutside.emit();
    }
  }
}
