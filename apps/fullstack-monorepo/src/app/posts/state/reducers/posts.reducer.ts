import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { loadPosts, loadPostsSuccess, loadPostsFailure, loadPostSuccess } from '../actions/posts.actions';
import { PostUserRO } from '@app/services/api.service';

// export interface Post {
//   id: string;
//   name: string;
// }

export interface State extends EntityState<PostUserRO> {
  // additional entities state properties
  selectedPostId: number;
  pending: boolean;
  error: any;
}

export function selectPostId(a: PostUserRO): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: PostUserRO, b: PostUserRO): number {
  return a.title.localeCompare(b.title);
}

export const adapter: EntityAdapter<PostUserRO> = createEntityAdapter<PostUserRO>({
  selectId: selectPostId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedPostId: null,
  pending: undefined,
  error: undefined
});

const postReducer = createReducer(
  initialState,
  on(loadPosts, (state, { page }) => {
    return { ...state, pending: true, error: undefined }
  }),
  on(loadPostsFailure, (state, { error }) => {
    return { ...state, pending: false, error }
  }),
  on(loadPostsSuccess, (state, { posts }) => {
    return {... adapter.addAll(posts, state), pending: false};
  }),
  on(loadPostSuccess, (state, { post }) => {
    return {... adapter.addOne(post, state), pending: false};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return postReducer(state, action);
}

export const getSelectedPostId = (state: State) => state.selectedPostId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of post ids
export const selectPostIds = selectIds;

// select the dictionary of post entities
export const selectPostEntities = selectEntities;

// select the array of posts
export const selectAllPosts = selectAll;

// select the total post count
export const selectPostTotal = selectTotal;