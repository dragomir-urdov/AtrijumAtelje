import { on } from '@ngrx/store';
import { createRehydrateReducer } from '@core/state/state-utilities';

import produce from 'immer';
import * as Joi from 'joi';

import * as AuthActions from '@auth/state/auth.actions';

// Models
import { User, userSchema, JwtToken, jwtSchema } from '@auth/models';

export const authFeatureKey = 'auth';

export interface State {
  user: User | null;
  jwt: JwtToken | null;
  error: any | null;
}

export const initialState: State = {
  user: null,
  jwt: null,
  error: null,
};

const schema = Joi.object({
  user: userSchema.required(),
  jwt: jwtSchema.required(),
  error: Joi.optional().allow(null),
});

export const reducer = createRehydrateReducer(
  'User',
  schema,
  initialState,
  on(AuthActions.authSuccess, (state, payload) => {
    return produce(state, (draftState) => {
      draftState.user = payload.user;
      draftState.jwt = payload.jwt;
      draftState.error = null;
    });
  }),
  on(AuthActions.authFailure, (state, payload) => clearAuthData(state, payload.error)),
  on(AuthActions.logoutSuccess, (state) => clearAuthData(state)),
  on(AuthActions.clearError, (state) => {
    return produce(state, (draftState) => {
      draftState.error = null;
    });
  })
);

/**
 *
 * @param state
 * @returns
 */
function clearAuthData(state: State, error?: any): State {
  return produce(state, (draftState) => {
    draftState.user = null;
    draftState.jwt = null;
    draftState.error = error;
  });
}
