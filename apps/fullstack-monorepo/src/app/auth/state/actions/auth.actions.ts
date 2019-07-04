import { Action, createAction, props } from '@ngrx/store';
import { UserDTO, UserRO } from '@app/services/api.service';

// export enum AuthActionTypes {
//   LoadAuths = '[Auth] Load Auths',


// }

// export class LoadAuths implements Action {
//   readonly type = AuthActionTypes.LoadAuths;
// }


// export type AuthActions = LoadAuths;


export const login = createAction('[Login Page] Login', props<UserDTO>());
export const loginSuccess = createAction('[Login API] Login Success', props<{ user: UserRO }>());
export const loginFailure = createAction('[Login API] Login Failure', props<{ error: any }>());