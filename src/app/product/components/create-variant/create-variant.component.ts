import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Store } from '@ngrx/store';
import * as CoreSelectors from '@app/core/+state/core.selectors';
import * as CoreActions from '@app/core/+state/core.actions';
import { Variant, VariantType } from '@app/shared/models';
import { Subscription, take, tap } from 'rxjs';
import { Actions, ofType } from '@ngrx/effects';

@Component({
  selector: 'app-create-variant',
  templateUrl: './create-variant.component.html',
  styleUrls: ['./create-variant.component.scss'],
})
export class CreateVariantComponent implements OnInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  form = this.formBuilder.group({
    title: new FormControl('', Validators.required),
    description: new FormControl(''),
  });

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly store: Store,
    private readonly actions$: Actions,
    private readonly dialogRef: MatDialogRef<CreateVariantComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: { variantType: VariantType }
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.actions$
        .pipe(
          ofType(CoreActions.createVariantSuccess),
          take(1),
          tap(() => {
            this.onCancel();
          })
        )
        .subscribe()
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.store.dispatch(
        CoreActions.createVariant({
          variant: this.form.value as Partial<Variant>,
          variantType: this.data.variantType,
        })
      );
    }
  }

  onCancel() {
    this.dialogRef?.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
