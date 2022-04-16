import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { GalleryEffects } from '@gallery/+state/gallery.effects';
import * as fromGallery from '@gallery/+state/gallery.reducer';

import { SharedModule } from '@shared/shared.module';

// Components
import { GalleryComponent, GalleryAddComponent } from '@gallery/components';

@NgModule({
  declarations: [GalleryComponent, GalleryAddComponent],
  imports: [
    CommonModule,
    SharedModule,
    StoreModule.forFeature(fromGallery.galleryFeatureKey, fromGallery.reducer),
    EffectsModule.forFeature([GalleryEffects]),
  ],
  exports: [GalleryComponent, GalleryAddComponent],
})
export class GalleryModule {}
