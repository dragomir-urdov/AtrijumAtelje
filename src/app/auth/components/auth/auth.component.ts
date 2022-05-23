import { Component, Inject, OnDestroy, Optional } from '@angular/core';

import { Store } from '@ngrx/store';
import * as AuthActions from '@app/auth/+state/auth.actions';

import { ModalRef } from '@shared/services';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  openedAsModal = false;

  constructor(
    private readonly store: Store,
    @Optional() private readonly dialogRef?: MatDialogRef<AuthComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public readonly data?: any
  ) {
    this.openedAsModal = !!this.dialogRef;
  }

  /**
   * It closes modal
   *
   * @author Dragomir Urdov
   */
  closeModal() {
    this.dialogRef?.close();
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
