import { createAction, props } from '@ngrx/store';
import { UserPostsRO } from '@app/services/api.service';

export const loadUsers = createAction('[User/API] Load Users', props<{ page: number }>());
export const loadUsersSuccess = createAction('[User/API] Load Users Success', props<{ users: UserPostsRO[] }>());
export const loadUsersFailure = createAction('[User/API] Load Users Failure', props<{ error: any }>());
