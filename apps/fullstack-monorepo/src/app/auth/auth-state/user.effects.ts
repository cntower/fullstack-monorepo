import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
// import {  ofType, createEffect } from '@ngrx/effects';
import { DataPersistence } from '@nrwl/angular';

import { UserPartialState } from './user.reducer';
import {
  LoadUser,
  UserLoaded,
  UserLoadError,
  UserActionTypes
} from './user.actions';
import { UsersApi } from '@app/services/api.service';

@Injectable()
export class UserEffects {
  @Effect() loadUser$ = this.dataPersistence.fetch(UserActionTypes.LoadUser, {
    run: (action: LoadUser, state: UserPartialState) => {
      // Your custom REST 'load' logic goes here. For now just return an empty list...
      return new UserLoaded([]);
    },

    onError: (action: LoadUser, error) => {
      console.error('Error', error);
      return new UserLoadError(error);
    }
  });


  // logins$ = createEffect(
  //   () =>
  //     this.actions$.pipe(
  //       ofType(LoginPageActions.login),
  //       exhaustMap(action =>
  //         this.authService.login(action.credentials).pipe(
  //           map(user => AuthApiActions.loginSuccess({ user })),
  //           catchError(error => of(AuthApiActions.loginFailure({ error })))
  //         )
  //       )
  //       // Errors are handled and it is safe to disable resubscription
  //     ),
  //   { resubscribeOnError: false }
  // );


  constructor(
    private actions$: Actions,
    private dataPersistence: DataPersistence<UserPartialState>,
    private usersApi: UsersApi
  ) { }
}
