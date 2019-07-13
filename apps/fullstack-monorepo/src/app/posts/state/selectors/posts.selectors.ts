import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromPost from '../reducers/posts.reducer';
import { selectRouteParams } from '@app/store';
 
export interface State {
  posts: fromPost.State;
}
 
export const reducers: ActionReducerMap<State> = {
  posts: fromPost.reducer,
};
 
export const selectPostState = createFeatureSelector<fromPost.State>('posts');
 
export const selectPostIds = createSelector(
  selectPostState,
  fromPost.selectPostIds
);
export const selectPostEntities = createSelector(
  selectPostState,
  fromPost.selectPostEntities
);
export const selectAllPosts = createSelector(
  selectPostState,
  fromPost.selectAllPosts
);
export const selectPostTotal = createSelector(
  selectPostState,
  fromPost.selectPostTotal
);
export const selectCurrentPostId = createSelector(
  selectPostState,
  fromPost.getSelectedPostId
);
 
export const selectCurrentPost = createSelector(
  selectPostEntities,
  selectCurrentPostId,
  (postEntities, postId) => postEntities[postId]
);

export const selectPostPending = createSelector(
  selectPostState,
  (state) => state.pending);

export const selectPostError = createSelector(
  selectPostState,
  (state) => state.error
);

export const selectRoutePostId = createSelector(
  selectRouteParams,
  (state) => state.postId
);