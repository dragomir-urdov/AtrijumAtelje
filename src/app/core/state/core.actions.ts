import { createAction, props } from '@ngrx/store';

import { Collection } from '@shared/models';

export const getCollections = createAction('[Core] Get Collections');
export const getCollectionsSuccess = createAction(
  '[Core] Get Collections Success',
  props<{ collections: Collection[] }>()
);
export const getCollectionsFailure = createAction('[Core] Get Collections Failure', props<{ error: any }>());

export const createCollection = createAction('[Core] Create Collection', props<{ collection: FormData }>());
export const createCollectionSuccess = createAction(
  '[Core] Create Collection Success',
  props<{ collection: Collection }>()
);
export const createCollectionFailure = createAction('[Core] Create Collection Failure', props<{ error: any }>());
