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
}

export const initialState: State = {
  user: null,
  jwt: null,
};

const schema = Joi.object({
  user: userSchema.required(),
  jwt: jwtSchema.required(),
});

export const reducer = createRehydrateReducer(
  'User',
  schema,
  initialState,
  on(AuthActions.loginSuccess, (state, payload) => {
    return produce(state, (draftState) => {
      draftState.user = payload.user;
      draftState.jwt = payload.jwt;
    });
  })
);
