import { createFeatureSelector } from '@ngrx/store';

import * as fromAuth from '@auth/state/auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(fromAuth.authFeatureKey);
