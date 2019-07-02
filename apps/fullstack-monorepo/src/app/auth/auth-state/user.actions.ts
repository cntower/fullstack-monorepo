import { Action } from '@ngrx/store';
import { Entity } from './user.reducer';
import { UserDTO, UserRO } from '@app/services/api.service';

export enum UserActionTypes {
  LoadUser = '[User] Load User',
  UserLoaded = '[User] User Loaded',
  UserLoadError = '[User] User Load Error',

  RegisterUser = '[User] Register User',
  UserRegistred = '[User Api] User Registred',
  UserRegisterError = '[User Api] User Register Error',

  LoginUser = '[User] Login User',
  UserLoggedIn = '[User Api] User Logged In',
  UserLoginError = '[User Api] User Login Error'
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;
  constructor() { }
}

export class UserLoadError implements Action {
  readonly type = UserActionTypes.UserLoadError;
  constructor(public payload: any) { }
}

export class UserLoaded implements Action {
  readonly type = UserActionTypes.UserLoaded;
  constructor(public payload: Entity) { }
}


export class RegisterUser implements Action {
  readonly type = UserActionTypes.RegisterUser;
  constructor() { }
}

export class UserRegisterError implements Action {
  readonly type = UserActionTypes.UserRegisterError;
  constructor(public payload: any) { }
}

export class UserRegistred implements Action {
  readonly type = UserActionTypes.UserRegistred;
  constructor(public payload: Entity) { }
}

export class LoginUser implements Action {
  readonly type = UserActionTypes.LoginUser;
  constructor(public payload: UserDTO) { }
}

export class UserLoginError implements Action {
  readonly type = UserActionTypes.UserLoginError;
  constructor(public payload: any) { }
}

export class UserLoggedIn implements Action {
  readonly type = UserActionTypes.UserLoggedIn;
  constructor(public payload: UserRO) { }
}

export type UserAction =
  LoadUser
  | UserLoaded
  | UserLoadError
  | RegisterUser
  | UserRegisterError
  | UserRegistred
  | LoginUser
  | UserLoggedIn
  | UserLoginError;

export const fromUserActions = {
  LoadUser,
  UserLoaded,
  UserLoadError,
  RegisterUser,
  UserRegisterError,
  UserRegistred,
  LoginUser,
  UserLoggedIn,
  UserLoginError,
};
