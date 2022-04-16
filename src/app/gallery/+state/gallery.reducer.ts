import { createReducer, on } from '@ngrx/store';
import * as GalleryActions from '@gallery/+state/gallery.actions';

import { Gallery } from '@gallery/models';

import produce from 'immer';

export const galleryFeatureKey = 'gallery';

export interface State {
  albums: Gallery | null;
}

const initialState: State = {
  albums: null,
};

export const reducer = createReducer(
  initialState,
  on(GalleryActions.getGallerySuccess, (state, { gallery }) =>
    produce(state, (draftState) => {
      draftState.albums = gallery;
    })
  )
);
