import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import * as fromCore from '@core/state/core.reducer';
import { CoreEffects } from '@core/state/core.effects';

import { environment } from '@environment';

export interface State {
  [fromCore.coreFeatureKey]: fromCore.State;
}

export const reducers: ActionReducerMap<State> = {
  [fromCore.coreFeatureKey]: fromCore.reducer,
};

export const effects = [CoreEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
