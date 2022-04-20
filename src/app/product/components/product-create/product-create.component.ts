import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Subscription } from 'rxjs';

// services
import { ModalRef } from '@shared/services';
import { Variant } from '@app/shared/models';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
})
export class ProductCreateComponent implements OnDestroy {
  openedAsModal = false;
  variants: Variant[] = [];

  form!: FormGroup;
  selected = new FormControl(0);

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    @Optional() @Inject(ModalRef) private readonly modalRef?: ModalRef
  ) {
    this.initForm();
    this.openedAsModal = !!modalRef;
  }

  /**
   * It inits product creation dorm.
   *
   * @author Dragomir Urdov
   */
  private initForm() {
    this.form = this.formBuilder.group({
      title: new FormControl(),
      description: new FormControl(),
      details: new FormControl(),
    });
  }

  addTab(variant: Variant, selectAfterAdding: boolean) {
    this.variants.push(variant);

    if (selectAfterAdding) {
      this.selected.setValue(this.variants.length - 1);
    }
  }

  removeTab(index: number) {
    this.variants.splice(index, 1);
  }

  /**
   * It closes modal.
   *
   * @author Dragomir Urdov
   */
  closeModal() {
    this.modalRef?.close();
  }

  /**
   * OnDestroy lifecycle hook.
   */
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
