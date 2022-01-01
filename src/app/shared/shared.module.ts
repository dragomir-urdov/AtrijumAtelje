import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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
  SelectComponent,
} from '@shared/components';
import { ClickOutsideDirective } from '@shared/directives';

const components: any[] = [
  MainComponent,
  FooterComponent,
  HeaderComponent,
  HeaderItemComponent,
  NotificationComponent,
  MobileMenuComponent,
  MobileMenuItemsComponent,
  SelectComponent,
];

const directives: any[] = [ClickOutsideDirective];

@NgModule({
  declarations: [components, directives],
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
  exports: [CommonModule, TranslateModule, FormsModule, ReactiveFormsModule, components, directives],
})
export class SharedModule {}
