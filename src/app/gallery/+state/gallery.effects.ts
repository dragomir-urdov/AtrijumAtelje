import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import * as GalleryActions from '@gallery/+state/gallery.actions';
import * as GallerySelectors from '@gallery/+state/gallery.selectors';

import { GalleryService } from '@gallery/services';
import { exhaustMap, filter, map } from 'rxjs';

@Injectable()
export class GalleryEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly galleryService: GalleryService
  ) {}

  getGallery$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(GalleryActions.getGallery),
      concatLatestFrom(() => this.store.select(GallerySelectors.selectGalleryFeature)),
      map(([action, gallery]) => gallery),
      // filter((gallery) => Object.entries(gallery).length < 0),
      exhaustMap(() => {
        return this.galleryService.getAlbums().pipe(map((gallery) => GalleryActions.getGallerySuccess({ gallery })));
      })
    );
  });
}
