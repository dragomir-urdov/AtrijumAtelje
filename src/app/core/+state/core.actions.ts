import { createAction, props } from '@ngrx/store';

import { Collection, Variant, VariantRes, VariantType } from '@shared/models';

export const getCoreData = createAction('[Core] Get Core Data');
export const getCoreDataSuccess = createAction(
  '[Core] Get Core Data Success',
  props<{ collections: Collection[]; variants: VariantRes }>()
);
export const getCoreDataFailure = createAction('[Core] Get Core Data Failure', props<{ error: any }>());

// export const getCollections = createAction('[Core] Get Collections');
// export const getCollectionsSuccess = createAction(
//   '[Core] Get Collections Success',
//   props<{ collections: Collection[] }>()
// );
// export const getCollectionsFailure = createAction('[Core] Get Collections Failure', props<{ error: any }>());

export const createCollection = createAction('[Core] Create Collection', props<{ collection: FormData }>());
export const createCollectionSuccess = createAction(
  '[Core] Create Collection Success',
  props<{ collection: Collection }>()
);
export const createCollectionFailure = createAction('[Core] Create Collection Failure', props<{ error: any }>());

// export const getVariants = createAction('[Core] Create Variant');
// export const getVariantsSuccess = createAction('[Core] Get Variants Success', props<{ variants: VariantRes }>());
// export const getVariantsFailure = createAction('[Core] Get Variants Failure', props<{ error: any }>());

export const createVariant = createAction(
  '[Core] Create Variant',
  props<{ variant: Partial<Variant>; variantType: VariantType }>()
);
export const createVariantSuccess = createAction(
  '[Core] Create Variant Success',
  props<{ variant: Variant; variantType: VariantType }>()
);
export const createVariantFailure = createAction('[Core] Create Variant Failure', props<{ error: any }>());

export const toggleVariant = createAction(
  '[Core] Toggle Variant',
  props<{ variantType: VariantType; variantId: number }>()
);
