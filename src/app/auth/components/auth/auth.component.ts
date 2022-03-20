import { Component, Inject, OnDestroy, Optional } from '@angular/core';

import { Store } from '@ngrx/store';
import * as AuthActions from '@auth/state/auth.actions';

import { ModalRef } from '@shared/services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  openedAsModal = false;

  constructor(private readonly store: Store, @Optional() @Inject(ModalRef) private readonly modalRef?: ModalRef) {
    this.openedAsModal = !!this.modalRef;
  }

  /**
   * It closes modal
   *
   * @author Dragomir Urdov
   */
  closeModal() {
    this.modalRef?.close();
  }

  ngOnDestroy(): void {
    this.store.dispatch(AuthActions.clearError());
  }
}
