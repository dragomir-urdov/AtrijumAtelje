import { NgModule } from '@angular/core';

import { PortalModule } from '@angular/cdk/portal';
import { OverlayModule } from '@angular/cdk/overlay';
import { LayoutModule } from '@angular/cdk/layout';

const cdk = [PortalModule, OverlayModule, LayoutModule];

@NgModule({
  imports: cdk,
  exports: cdk,
})
export class CdkModule {}
