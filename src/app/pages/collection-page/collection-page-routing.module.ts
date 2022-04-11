import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CollectionItemComponent } from './collection-item/collection-item.component';
import { CollectionListComponent } from './collection-list/collection-list.component';

const routes: Routes = [
  {
    path: '',
    component: CollectionListComponent,
  },
  {
    path: ':id',
    component: CollectionItemComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollectionPageRoutingModule {}
