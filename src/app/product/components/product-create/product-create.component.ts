import { Component, Inject, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { ModalRef } from '@shared/services';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
})
export class ProductCreateComponent {
  openedAsModal = false;

  form!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    @Optional() @Inject(ModalRef) private readonly modalRef?: ModalRef
  ) {
    this.initForm();
    this.openedAsModal = !!modalRef;
  }

  private initForm() {
    this.form = this.formBuilder.group({
      title: new FormControl(),
      description: new FormControl(),
      details: new FormControl(),
    });
  }

  closeModal() {
    this.modalRef?.close();
  }
}
