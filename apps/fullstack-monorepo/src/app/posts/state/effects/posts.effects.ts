import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { PostsApi } from '@app/services/api.service';
import { loadPosts, loadPostsSuccess, loadPostsFailure, loadPost, loadPostSuccess, loadPostFailure } from '../actions/posts.actions';
import { of } from 'rxjs';
import { exhaustMap, catchError, map } from 'rxjs/operators';


@Injectable()
export class PostsEffects {
  loadOne$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPost),
      exhaustMap(({ postId }) => this.postsApi.getPost(postId).pipe(
        map(post => loadPostSuccess({ post })),
        catchError(error => of(loadPostFailure({ error }))))
      )
    )
  );
  loadAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadPosts),
      exhaustMap(({ page }) => this.postsApi.getPosts(page).pipe(
        map(posts => loadPostsSuccess({ posts })),
        catchError(error => of(loadPostsFailure({ error }))))
      )
    )
  );
  constructor(
    private actions$: Actions,
    private postsApi: PostsApi
  ) { }
}