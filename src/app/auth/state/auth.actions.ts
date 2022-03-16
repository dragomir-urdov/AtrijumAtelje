import { createAction, props } from '@ngrx/store';
import { User, JwtToken } from '@auth/models';

export const login = createAction('[Auth] Login', props<{ email: string; password: string }>());
export const loginSuccess = createAction('[Auth] Login Success', props<{ user: User; jwt: JwtToken }>());
export const loginFailure = createAction('[Auth] Login Fail', props<{ error: any }>());

export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');
export const logoutFailure = createAction('[Auth] Logout Fail', props<{ error: any }>());
