import { ActionReducerMap, MetaReducer } from '@ngrx/store';

import { CoreEffects } from '@app/core/+state/core.effects';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import * as fromCore from '@app/core/+state/core.reducer';

import { environment } from '@environment';

export interface State {
  [fromCore.coreFeatureKey]: fromCore.State;
  router: RouterReducerState;
}

export const reducers: ActionReducerMap<State> = {
  [fromCore.coreFeatureKey]: fromCore.reducer,
  router: routerReducer,
};

export const effects = [CoreEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
