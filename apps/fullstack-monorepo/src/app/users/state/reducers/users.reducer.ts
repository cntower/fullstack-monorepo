import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { UserPostsRO } from '@app/services/api.service';
import { createReducer, on, Action } from '@ngrx/store';
import { loadUsers, loadUsersSuccess, loadUsersFailure } from '../actions/users.actions';

// export interface User {
//   id: string;
//   name: string;
// }

export interface State extends EntityState<UserPostsRO> {
  // additional entities state properties
  selectedUserId: number;
  pending: boolean;
  error: any;
}

export function selectUserId(a: UserPostsRO): string {
  //In this case this would be optional since primary key is id
  return a.id;
}

export function sortByName(a: UserPostsRO, b: UserPostsRO): number {
  return a.username.localeCompare(b.username);
}

export const adapter: EntityAdapter<UserPostsRO> = createEntityAdapter<UserPostsRO>({
  selectId: selectUserId,
  sortComparer: sortByName,
});

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedUserId: null,
  pending: undefined,
  error: undefined
});

const userReducer = createReducer(
  initialState,
  on(loadUsers, (state, { page }) => {
    return { ...state, pending: true, error: undefined }
  }),
  on(loadUsersFailure, (state, { error }) => {
    return { ...state, pending: false, error }
  }),
  on(loadUsersSuccess, (state, { users }) => {
    return {... adapter.addAll(users, state), pending: false};
  })
);

export function reducer(state: State | undefined, action: Action) {
  return userReducer(state, action);
}

export const getSelectedUserId = (state: State) => state.selectedUserId;

// get the selectors
const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();

// select the array of user ids
export const selectUserIds = selectIds;

// select the dictionary of user entities
export const selectUserEntities = selectEntities;

// select the array of users
export const selectAllUsers = selectAll;

// select the total user count
export const selectUserTotal = selectTotal;