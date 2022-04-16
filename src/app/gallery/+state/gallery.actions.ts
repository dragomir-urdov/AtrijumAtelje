import { createAction, props } from '@ngrx/store';

import { Gallery } from '@gallery/models';

export const getGallery = createAction('[Gallery] Get Gallery');
export const getGallerySuccess = createAction('[Gallery] Get Gallery Success', props<{ gallery: Gallery }>());
export const getGalleryFailure = createAction('[Gallery] Get Gallery Failure', props<{ error: any }>());
