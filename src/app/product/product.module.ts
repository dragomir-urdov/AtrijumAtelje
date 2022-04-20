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
} from '@product/components';

@NgModule({
  declarations: [ProductCreateComponent, ProductFiltersWrapperComponent, ProductCreateVariantComponent],
  imports: [CommonModule, SharedModule, GalleryModule],
  exports: [ProductCreateComponent, ProductFiltersWrapperComponent, ProductCreateVariantComponent],
})
export class ProductModule {}
