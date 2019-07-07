import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { UsersApi } from '@app/services/api.service';
import { AuthService } from '@app/auth/auth.service';

@Injectable()
export class AuthEffects {
  loginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginSuccess, AuthActions.registerSuccess),
      tap(
        r => this.authService.token = r.user.token
      )
    ), { dispatch: false }
  );
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.usersApi.login(action).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      exhaustMap(action =>
        this.usersApi.register(action).pipe(
          map(user => AuthActions.registerSuccess({ user })),
          catchError(error => of(AuthActions.registerFailure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private usersApi: UsersApi,
    private authService: AuthService
  ) { }
}