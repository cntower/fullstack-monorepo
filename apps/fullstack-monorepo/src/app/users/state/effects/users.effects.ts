import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { UsersApi } from '@app/services/api.service';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from '../actions/users.actions';
import { of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';


@Injectable()
export class UsersEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUsers),
      exhaustMap(() =>
        this.usersApi.showAllUsers(1).pipe(
          map(users => loadUsersSuccess({ users })),
          catchError(error => of(loadUsersFailure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private usersApi: UsersApi
  ) { }
}