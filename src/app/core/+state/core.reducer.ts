import { createReducer, on } from '@ngrx/store';
import * as CoreActions from '@app/core/+state/core.actions';

import produce from 'immer';

import { Collection, VariantRes } from '@shared/models';
import { Gallery } from '@gallery/models';

export const coreFeatureKey = 'core';

export interface State {
  loaded: boolean;
  collections: Collection[];
  variants: VariantRes | null;
}

const initialState: State = {
  loaded: false,
  collections: [],
  variants: null,
};

export const reducer = createReducer(
  initialState,
  // on(CoreActions.getCollectionsSuccess, (state, { collections }) =>
  //   produce(state, (draftState) => {
  //     draftState.collections = collections;
  //   })
  // ),
  on(CoreActions.createCollectionSuccess, (state, { collection }) =>
    produce(state, (draftState) => {
      draftState.collections.push(collection);
    })
  ),
  on(CoreActions.getCoreDataSuccess, (state, { collections, variants }) =>
    produce(state, (draftState) => {
      draftState.collections = collections;
      draftState.variants = variants;
      draftState.loaded = true;
    })
  ),
  on(CoreActions.toggleVariant, (state, { variantType, variantId }) =>
    produce(state, (draftState) => {
      draftState.variants![variantType] = state.variants![variantType].map((item) => {
        if (item.id === variantId) {
          return { ...item, active: !item.active };
        }
        return item;
      });
    })
  )
);
