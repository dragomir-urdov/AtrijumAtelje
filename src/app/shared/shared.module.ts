import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';

import { TranslateModule } from '@ngx-translate/core';

import {
  MainComponent,
  FooterComponent,
  HeaderComponent,
  NotificationComponent,
  HeaderItemComponent,
  MobileMenuComponent,
  MobileMenuItemsComponent,
} from '@shared/components';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components: any[] = [
  MainComponent,
  FooterComponent,
  HeaderComponent,
  HeaderItemComponent,
  NotificationComponent,
  MobileMenuComponent,
  MobileMenuItemsComponent,
];

@NgModule({
  declarations: [components],
  imports: [
    RouterModule,
    CommonModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    PortalModule,
    OverlayModule,
    LayoutModule,
  ],
  exports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, components],
})
export class SharedModule {}
