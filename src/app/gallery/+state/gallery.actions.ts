import { createAction, props } from '@ngrx/store';

import { Gallery, ImageRes } from '@gallery/models';

export const getGallery = createAction('[Gallery] Get Gallery');
export const getGallerySuccess = createAction('[Gallery] Get Gallery Success', props<{ gallery: Gallery }>());
export const getGalleryFailure = createAction('[Gallery] Get Gallery Failure', props<{ error: any }>());

export const uploadImages = createAction('[Gallery] Upload Images', props<{ images: FormData; album: string }>());
export const uploadImagesSuccess = createAction(
  '[Gallery] Upload Images Success',
  props<{ images: ImageRes[]; album: string }>()
);
export const uploadImagesFailure = createAction('[Gallery] Upload Images Failure', props<{ error: any }>());
