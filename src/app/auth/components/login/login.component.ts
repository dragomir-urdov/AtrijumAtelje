import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { filter, take } from 'rxjs';

import { Store } from '@ngrx/store';
import * as AuthActions from '@auth/state/auth.actions';
import * as AuthSelectors from '@auth/state/auth.selectors';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Output() cancel = new EventEmitter<void>();

  minPasswordLength = AppGlobals.MIN_PASSWORD_LENGTH;

  form!: FormGroup;
  get email(): AbstractControl {
    return this.form.get('email')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }

  error$ = this.store.select(AuthSelectors.selectAuthError);

  constructor(private readonly store: Store, private readonly formBuilder: FormBuilder) {
    this.createForm();
    this.connectSuccessAuth();
  }

  /**
   * It creates login form.
   *
   * @author Dragomir Urdov
   */
  private createForm() {
    this.form = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(AppGlobals.MIN_PASSWORD_LENGTH)]),
    });
  }

  /**
   * It closes modal after user is successfully logged in.
   *
   * @author Dragomir Urdov
   */
  private connectSuccessAuth() {
    this.store
      .select(AuthSelectors.selectIsAuthenticated)
      .pipe(
        filter((isAuthenticated) => isAuthenticated),
        take(1)
      )
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) this.closeModal();
      });
  }

  /**
   * It closes modal.
   *
   * @author Dragomir Urdov
   */
  closeModal() {
    this.cancel.emit();
  }

  /**
   * It logs in users.
   *
   * @author Dragomir Urdov
   */
  login() {
    if (this.form.status === 'VALID') {
      this.store.dispatch(AuthActions.login(this.form.value));
    }
  }
}
