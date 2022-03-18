import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { exhaustMap, switchMap, map, catchError, tap, filter, take } from 'rxjs/operators';

import { Action, Store } from '@ngrx/store';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';

import * as AuthSelectors from '@auth/state/auth.selectors';
import * as AuthActions from '@auth/state/auth.actions';

import { AuthService } from '@auth/services';

@Injectable()
export class AuthEffects implements OnInitEffects {
  init$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.init),
        switchMap(() =>
          this.store.select(AuthSelectors.selectJwt).pipe(
            take(1),
            filter((jwt) => jwt !== null),
            tap((jwt) => {
              this.authService.initExpirationSchedule(jwt!.expiresIn);
            })
          )
        )
      );
    },
    { dispatch: false }
  );

  authSuccess$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.authSuccess),
        tap((res) => {
          this.authService.initExpirationSchedule(res.jwt.expiresIn);
        })
      );
    },
    { dispatch: false }
  );

  signup$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.signup),
      exhaustMap((payload) => {
        return this.authService.signup(payload).pipe(
          map((res) => AuthActions.authSuccess(res)),
          catchError((error) => of(AuthActions.authFailure({ error })))
        );
      })
    );
  });

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap((payload) => {
        return this.authService.login(payload.email, payload.password).pipe(
          map((res) => AuthActions.authSuccess(res)),
          catchError((error) => of(AuthActions.authFailure({ error })))
        );
      })
    );
  });

  logout$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.logout),
      exhaustMap(() => {
        return this.authService.logout().pipe(
          map((res) => {
            return AuthActions.logoutSuccess();
          }),
          catchError((error) => of(AuthActions.logoutFailure({ error })))
        );
      })
    );
  });

  constructor(
    private readonly actions$: Actions,
    private readonly authService: AuthService,
    private readonly store: Store
  ) {}
  ngrxOnInitEffects(): Action {
    return AuthActions.init();
  }
}
