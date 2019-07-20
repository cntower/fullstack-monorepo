import { createAction, props } from '@ngrx/store';
import { UserDTO, UserRO } from '@app/services/api.service';

export const login = createAction('[Login Page] Login', props<UserDTO>());
export const logout = createAction('[Pages] Logout');
export const loginSuccess = createAction('[Login API] Login Success', props<{ user: UserRO }>());
export const loginFailure = createAction('[Login API] Login Failure', props<{ error: any }>());

export const register = createAction('[Register Page] Register', props<UserDTO>());
export const registerSuccess = createAction('[Register API] Register Success', props<{ user: UserRO }>());
export const registerFailure = createAction('[Register API] Register Failure', props<{ error: any }>());