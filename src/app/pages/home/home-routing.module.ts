import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaticPageResolver } from '@shared/resolvers';

import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { static: StaticPageResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
