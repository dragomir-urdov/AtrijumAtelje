import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromAuth from '@auth/state/auth.reducer';

import { environment } from '@environment';

export interface State {
  [fromAuth.authFeatureKey]: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = { [fromAuth.authFeatureKey]: fromAuth.reducer };

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
