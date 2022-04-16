import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CollectionPageRoutingModule } from './collection-page-routing.module';

import { SharedModule } from '@shared/shared.module';
import { ProductModule } from '@product/product.module';

// Components
import { CollectionListComponent } from './collection-list/collection-list.component';
import { CollectionItemComponent } from './collection-item/collection-item.component';
import { CollectionCreateComponent } from './collection-create/collection-create.component';

@NgModule({
  declarations: [CollectionListComponent, CollectionItemComponent, CollectionCreateComponent],
  imports: [CommonModule, SharedModule, CollectionPageRoutingModule, ProductModule],
})
export class CollectionPageModule {}
