import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appDragAndDropFile]',
})
export class DragAndDropFileDirective {
  constructor() {}

  @HostListener('dragover', ['$event'])
  private dragOver(event: DragEvent) {
    // console.log('dragover => ', event);
  }

  @HostListener('dragleave', ['$event'])
  private dragLeave(event: DragEvent) {
    // console.log('dragleave => ', event);
  }

  @HostListener('drop', ['$event'])
  private dragDrop(event: DragEvent) {
    // event.preventDefault();
    // event.stopPropagation();
  }
}
