import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from '@auth/state/auth.reducer';

import { JwtToken, User } from '@auth/models';

export const selectAuthState = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);

export const selectIsLoggedIn = createSelector(
  selectAuthState,
  (state: fromAuth.State): boolean => !!state.jwt && !!state.jwt?.token && !!state.user
);

export const selectUser = createSelector(selectAuthState, (state: fromAuth.State): User | null => state.user);
export const selectJwt = createSelector(selectAuthState, (state: fromAuth.State): JwtToken | null => state.jwt);

export const selectAuthError = createSelector(selectAuthState, (state: fromAuth.State): any | null => state.error);
