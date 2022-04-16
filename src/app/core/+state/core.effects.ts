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

  // getCollections$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(CoreActions.getCollections),
  //     exhaustMap(() => {
  //       return this.collectionService.getCollections().pipe(
  //         map((collections) => CoreActions.getCollectionsSuccess({ collections })),
  //         catchError((error) => of(CoreActions.getCollectionsFailure({ error })))
  //       );
  //     })
  //   );
  // });

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
}
