import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '@core/state/core.reducer';

export const selectCoreFeature = createFeatureSelector<fromCore.State>(fromCore.coreFeatureKey);

export const selectCollections = createSelector(selectCoreFeature, (state) => state.collections);
export const selectCollectionsById = (id: number) =>
  createSelector(selectCoreFeature, (state) => state.collections.find((collection) => collection.id === id));
