import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from '@core/components';

import { route } from '@app/app.globals';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: route.home.path,
        loadChildren: () => import('@pages/home/home.module').then((module) => module.HomeModule),
      },
      {
        path: route.about.path,
        loadChildren: () => import('@pages/about/about.module').then((module) => module.AboutModule),
      },
      {
        path: route.collections.path,
        loadChildren: () =>
          import('@app/pages/collection-page/collection-page.module').then((module) => module.CollectionPageModule),
      },
      {
        path: route.notFound.path,
        loadChildren: () => import('@pages/not-found/not-found.module').then((module) => module.NotFoundModule),
      },
    ],
  },
  {
    path: route.error.path,
    loadChildren: () => import('@pages/error/error.module').then((module) => module.ErrorModule),
  },
  {
    path: '**',
    redirectTo: route.notFound.path,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
