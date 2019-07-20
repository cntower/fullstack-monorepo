import {
  createSelector,
  createFeatureSelector,
  Store,
} from '@ngrx/store';
import * as fromPost from '../reducers/posts.reducer';
import { selectRouteParams } from '@app/store';
import { loadPost } from '../actions/posts.actions';

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

export const selectRoutePost = createSelector(
  selectPostEntities,
  selectRoutePostId,
  (postEntities, postId) => postEntities[postId]
);


export function selectLoadRoutePost(store: Store<fromPost.State>) {
  return createSelector(
    selectPostEntities,
    selectRoutePostId,
    (postEntities, postId) => {
      if (postId) {
        if (!postEntities[postId]) {
          store.dispatch(loadPost({ postId }));
        } else {
          return postEntities[postId]
        }
      } else {
        return null;
      }
    }
  );
}