import { createReducer, on } from '@ngrx/store';
import { createRehydrateReducer } from '@core/state/state-utilities';

import * as AuthActions from '@auth/state/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  user: any | null;
  token: string | null;
}

export const initialState: State = {
  user: null,
  token: null,
};

export const reducer = createRehydrateReducer('User', initialState);
