import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@shared/shared.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAuth from '@app/auth/+state/auth.reducer';
import { AuthEffects } from '@app/auth/+state/auth.effects';

import { SignupComponent, LoginComponent, AuthComponent } from '@auth/components';

@NgModule({
  declarations: [SignupComponent, LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    SharedModule,

    // Store -------------------------------------------------------------------
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  exports: [SignupComponent, LoginComponent, AuthComponent],
})
export class AuthModule {}
