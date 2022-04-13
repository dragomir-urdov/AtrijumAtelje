import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromCore from '@core/state/core.reducer';

export const selectCoreFeature = createFeatureSelector<fromCore.State>(fromCore.coreFeatureKey);

// Collections
export const selectCollections = createSelector(selectCoreFeature, (state) => state.collections);
export const selectCollectionsById = (id: number) => {
  return createSelector(selectCoreFeature, (state) => {
    return state.collections.find((collection) => collection.id === id);
  });
};

// Variants
export const selectVariants = createSelector(selectCoreFeature, (state) => state.variants);

export const selectGallery = createSelector(selectCoreFeature, (state) => state.gallery);
