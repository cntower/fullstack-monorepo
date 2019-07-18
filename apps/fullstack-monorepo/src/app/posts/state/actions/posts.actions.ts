import { createAction, props } from '@ngrx/store';
import { PostUserRO } from '@app/services/api.service';

export const loadPosts = createAction('[Post] Load Posts', props<{ page: number }>());
export const loadPostsSuccess = createAction('[Post/API] Load Posts Success', props<{ posts: PostUserRO[] }>());
export const loadPostsFailure = createAction('[Post/API] Load Posts Failure', props<{ error: any }>());
export const loadPost = createAction('[Post] Load Post', props<{ postId: number }>());
