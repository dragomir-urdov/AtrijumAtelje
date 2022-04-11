import { Component, Inject, OnDestroy, Optional } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Subscription, take, tap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import * as CoreActions from '@core/state/core.actions';

// Services
import { ModalRef } from '@shared/services';

@Component({
  selector: 'app-collection-create',
  templateUrl: './collection-create.component.html',
})
export class CollectionCreateComponent implements OnDestroy {
  form!: FormGroup;
  get title(): AbstractControl {
    return this.form.get('title')!;
  }
  get description(): AbstractControl {
    return this.form.get('description')!;
  }

  imagePath?: string;
  openedAsModal = false;

  private subscriptions = new Subscription();

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly actions$: Actions,
    @Optional() @Inject(ModalRef) private readonly modalRef?: ModalRef
  ) {
    this.openedAsModal = !!this.modalRef;
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      title: new FormControl('', Validators.required),
      description: new FormControl(''),
      file: new FormControl(null, Validators.required),
    });
  }

  imagePreview(event: Event) {
    const target = event?.target as HTMLInputElement;
    if (!target || !target.files) return;

    const file = target.files![0];

    if (!file) {
      return;
    }

    this.form.controls['file'].setValue(file);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePath = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const formData = new FormData();

    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('image', this.form.value.file);

    this.store.dispatch(CoreActions.createCollection({ collection: formData }));

    this.closeModalOnSubmit();
  }

  closeModal() {
    this.modalRef?.close();
  }

  private closeModalOnSubmit() {
    this.subscriptions.add(
      this.actions$
        .pipe(
          ofType(CoreActions.createCollectionSuccess),
          take(1),
          tap(() => {
            this.closeModal();
          })
        )
        .subscribe()
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
