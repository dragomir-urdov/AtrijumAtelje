import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import * as fromAuth from '@auth/state/auth.reducer';
import { AuthEffects } from '@auth/state/auth.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

    // Store -------------------------------------------------------------------
    StoreModule.forFeature(fromAuth.authFeatureKey, fromAuth.reducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
