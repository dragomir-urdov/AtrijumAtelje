import { Injectable } from '@angular/core';

import { catchError, exhaustMap, forkJoin, map, of, switchMap } from 'rxjs';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as CoreActions from '@app/core/+state/core.actions';

import { CollectionService } from '@core/services';

@Injectable()
export class CoreEffects {
  constructor(private readonly actions$: Actions, private readonly collectionService: CollectionService) {}

  getCoreData$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.getCoreData),
      switchMap(() =>
        forkJoin({
          collections: this.collectionService.getCollections(),
          variants: this.collectionService.getVariants(),
        })
      ),
      exhaustMap(({ collections, variants }) => of(CoreActions.getCoreDataSuccess({ collections, variants }))),
      catchError((error) => of(CoreActions.getCoreDataFailure({ error })))
    );
  });

  createCollection$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.createCollection),
      exhaustMap(({ collection }) => {
        return this.collectionService
          .createCollection(collection)
          .pipe(map((res) => CoreActions.createCollectionSuccess({ collection: res })));
      })
    );
  });

  createVariant$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.createVariant),
      exhaustMap(({ variant, variantType }) => {
        return this.collectionService.createVariant(variant, variantType).pipe(
          map((data: any) => {
            return CoreActions.createVariantSuccess({ variant: data, variantType });
          }),
          catchError((error) => of(CoreActions.createVariantFailure({ error })))
        );
      })
    );
  });
}
