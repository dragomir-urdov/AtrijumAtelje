import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { exhaustMap, map, catchError } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthActions from '@auth/state/auth.actions';

import { AuthService } from '@auth/services';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((payload) =>
        this.authService.login(payload.email, payload.password).pipe(
          map((res) => AuthActions.loginSuccess({ user: res.user, jwt: res.jwt })),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    );
  });

  constructor(private readonly actions$: Actions, private readonly authService: AuthService) {}
}
