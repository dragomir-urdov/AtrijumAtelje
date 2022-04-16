import { createFeatureSelector, createSelector } from '@ngrx/store';

import { galleryFeatureKey, State } from '@gallery/+state/gallery.reducer';

export const selectGalleryFeature = createFeatureSelector<State>(galleryFeatureKey);

export const selectAlbums = createSelector(selectGalleryFeature, (state) => state.albums);
export const selectGalleryAlbum = (album?: string) =>
  createSelector(selectGalleryFeature, (state) => {
    if (state.albums) {
      return null;
    }
    return album ? state.albums![album] : state.albums;
  });
