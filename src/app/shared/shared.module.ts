import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PortalModule } from '@angular/cdk/portal';

import { TranslateModule } from '@ngx-translate/core';

import {
  MainComponent,
  FooterComponent,
  HeaderComponent,
  NotificationComponent,
} from '@shared/components';

const components: any[] = [
  MainComponent,
  FooterComponent,
  HeaderComponent,
  NotificationComponent,
];

@NgModule({
  declarations: [components],
  imports: [RouterModule, CommonModule, TranslateModule, PortalModule],
  exports: [CommonModule, TranslateModule, components],
})
export class SharedModule {}
