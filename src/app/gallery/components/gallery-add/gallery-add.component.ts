import { Component, Inject, Optional } from '@angular/core';
import { ModalRef } from '@app/shared/services';

@Component({
  selector: 'app-gallery-add',
  templateUrl: './gallery-add.component.html',
})
export class GalleryAddComponent {
  openedAsModal = false;

  constructor(@Optional() @Inject(ModalRef) private readonly modalRef: ModalRef) {
    this.openedAsModal = !!this.modalRef;
  }

  closeModal() {
    this.modalRef?.close();
  }
}
