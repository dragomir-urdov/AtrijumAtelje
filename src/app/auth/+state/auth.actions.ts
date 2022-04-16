import { createAction, props } from '@ngrx/store';
import { User, JwtToken } from '@auth/models';

export const init = createAction('[Auth] Init');

export const signup = createAction(
  '[Auth] Signup',
  props<{
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }>()
);
export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const authSuccess = createAction('[Auth] Auth Success', props<{ user: User; jwt: JwtToken }>());
export const authFailure = createAction('[Auth] Auth Fail', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Fail', props<{ error: any }>());

export const refreshToken = createAction('[Auth] Refresh Token');

export const clearError = createAction('[Auth] Clear Error');
