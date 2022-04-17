import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

import { CarouselComponent, FavoriteCollectionsComponent } from '@pages/home/components';

import { SharedModule } from '@shared/shared.module';

const components: any[] = [HomeComponent, CarouselComponent, FavoriteCollectionsComponent];
@NgModule({
  declarations: [components],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class HomeModule {}
