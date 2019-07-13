import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { PostsApi } from '@app/services/api.service';
import { loadPosts, loadPostsSuccess, loadPostsFailure } from '../actions/posts.actions';
import { of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';


@Injectable()
export class PostsEffects {
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      exhaustMap(() =>
        this.postsApi.getPosts(1).pipe(
          map(posts => loadPostsSuccess({ posts })),
          catchError(error => of(loadPostsFailure({ error })))
        )
      )
    )
  );
  constructor(
    private actions$: Actions,
    private postsApi: PostsApi
  ) { }
}