import { Injectable } from '@angular/core';

import { catchError, exhaustMap, filter, forkJoin, map, of, switchMap } from 'rxjs';

import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType, concatLatestFrom } from '@ngrx/effects';
import * as CoreActions from '@core/state/core.actions';
import * as CoreSelectors from '@core/state/core.selectors';

import { CollectionService } from '@core/services';
import { GalleryService } from '@shared/services';

@Injectable()
export class CoreEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly collectionService: CollectionService,
    private readonly galleryService: GalleryService
  ) {}

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

  getGallery$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(CoreActions.getGallery),
      concatLatestFrom(() => this.store.select(CoreSelectors.selectGallery)),
      map(([action, gallery]) => gallery),
      filter((gallery) => !gallery),
      exhaustMap(() => {
        return this.galleryService.getAlbums().pipe(map((gallery) => CoreActions.getGallerySuccess({ gallery })));
      })
    );
  });
}
