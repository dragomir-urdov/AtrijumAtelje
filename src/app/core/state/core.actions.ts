import { createAction, props } from '@ngrx/store';

export const getCollections = createAction('[Core] Get Collections');
export const getCollectionsSuccess = createAction('[Core] Get Collections Success', props<{ collections: any[] }>());
export const getCollectionsFailure = createAction('[Core] Get Collections Failure', props<{ error: any }>());

export const createCollection = createAction('[Core] Create Collection', props<{ collection: FormData }>());
export const createCollectionSuccess = createAction('[Core] Create Collection Success', props<{ collection: any }>());
export const createCollectionFailure = createAction('[Core] Create Collection Failure', props<{ error: any }>());
