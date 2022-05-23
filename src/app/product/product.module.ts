import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '@shared/shared.module';
import { GalleryModule } from '@gallery/gallery.module';

// Components
import {
  ProductCreateComponent,
  ProductFiltersWrapperComponent,
  ProductCreateVariantComponent,
  CreateVariantComponent,
} from '@product/components';

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductFiltersWrapperComponent,
    ProductCreateVariantComponent,
    CreateVariantComponent,
  ],
  imports: [CommonModule, SharedModule, GalleryModule],
  exports: [
    ProductCreateComponent,
    ProductFiltersWrapperComponent,
    ProductCreateVariantComponent,
    CreateVariantComponent,
  ],
})
export class ProductModule {}
