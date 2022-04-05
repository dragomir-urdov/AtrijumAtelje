import { createReducer, on } from '@ngrx/store';
import * as CoreActions from '@core/state/core.actions';

import produce from 'immer';

export const coreFeatureKey = 'core';

export interface State {
  collections: any[];
}

const initialState: State = {
  collections: [],
};

export const reducer = createReducer(
  initialState,
  on(CoreActions.getCollectionsSuccess, (state, { collections }) =>
    produce(state, (draftState) => {
      draftState.collections = collections;
    })
  ),
  on(CoreActions.createCollectionSuccess, (state, { collection }) =>
    produce(state, (draftState) => {
      draftState.collections.push(collection);
    })
  )
);
