import { Component, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { filter, take } from 'rxjs';

import { Store } from '@ngrx/store';
import * as AuthActions from '@auth/state/auth.actions';
import * as AuthSelectors from '@auth/state/auth.selectors';

import { FormValidators } from '@shared/validators';

import * as AppGlobals from '@app/app.globals';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  @Output() cancel = new EventEmitter<void>();

  minPasswordLength = AppGlobals.MIN_PASSWORD_LENGTH;

  form!: FormGroup;
  get email(): AbstractControl {
    return this.form.get('email')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }
  get confirmPassword(): AbstractControl {
    return this.form.get('confirmPassword')!;
  }
  get firstName(): AbstractControl {
    return this.form.get('firstName')!;
  }
  get lastName(): AbstractControl {
    return this.form.get('lastName')!;
  }

  error$ = this.store.select(AuthSelectors.selectAuthError);

  constructor(private readonly store: Store, private readonly formBuilder: FormBuilder) {
    this.createForm();
    this.connectSuccessAuth();
  }

  /**
   * It creates signup form.
   *
   * @author Dragomir Urdov
   */
  private createForm() {
    this.form = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(AppGlobals.MIN_PASSWORD_LENGTH)]),
        confirmPassword: new FormControl('', [
          Validators.required,
          Validators.minLength(AppGlobals.MIN_PASSWORD_LENGTH),
        ]),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
      },
      { validators: [FormValidators.equalValues('password', 'confirmPassword')] }
    );
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
   * It signs up users.
   *
   * @author Dragomir Urdov
   */
  signup() {
    if (this.form.status === 'VALID') {
      this.store.dispatch(AuthActions.signup(this.form.value));
    }
  }
}
