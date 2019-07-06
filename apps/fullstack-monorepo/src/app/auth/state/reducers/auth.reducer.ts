import { Action, createReducer, on } from '@ngrx/store';
import * as AuthActions from '../actions/auth.actions';
import { UserRO } from '@app/services/api.service';

export interface State {
  pending: boolean;
  error: any;
  user: UserRO;
}
export const initialState: State = {
  pending: false,
  error: undefined,
  user: undefined
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.login, AuthActions.register, state => ({ ...state, pending: true, error: undefined })),
  on(AuthActions.loginSuccess, AuthActions.registerSuccess, (state, action) => ({ ...state, pending: false, user: action.user })),
  on(AuthActions.loginFailure, AuthActions.registerFailure, (state, action) => ({ ...state, pending: false, error: action.error })),
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}
