// import { Injectable } from '@angular/core';
// import { Actions, Effect, ofType } from '@ngrx/effects';

// import { concatMap } from 'rxjs/operators';
// import { EMPTY } from 'rxjs';
// import { login } from '../actions/auth.actions';
// // import { AuthActionTypes, AuthActions } from '../actions/auth.actions';



// @Injectable()
// export class AuthEffects {


//   @Effect()
//   loadAuths$ = this.actions$.pipe(
//     ofType(login),
//     /** An EMPTY observable only emits completion. Replace with your own observable API request */
//     concatMap(() => EMPTY)
//   );


//   constructor(private actions$: Actions<AuthActions>) {}

// }


import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import * as AuthActions from '../actions/auth.actions';
import { UsersApi } from '@app/services/api.service';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      exhaustMap(action =>
        this.authService.login(action).pipe(
          map(user => AuthActions.loginSuccess({ user })),
          catchError(error => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: UsersApi
  ) { }
}