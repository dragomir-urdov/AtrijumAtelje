import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '@shared/shared.module';
import { GalleryModule } from '@gallery/gallery.module';

// Components
import { ProductCreateComponent, ProductFiltersWrapperComponent } from '@product/components';

@NgModule({
  declarations: [ProductCreateComponent, ProductFiltersWrapperComponent],
  imports: [CommonModule, SharedModule, GalleryModule],
  exports: [ProductCreateComponent, ProductFiltersWrapperComponent],
})
export class ProductModule {}
