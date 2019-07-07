import {
  createSelector,
  createFeatureSelector,
  ActionReducerMap,
} from '@ngrx/store';
import * as fromUser from '../reducers/users.reducer';
 
export interface State {
  users: fromUser.State;
}
 
export const reducers: ActionReducerMap<State> = {
  users: fromUser.reducer,
};
 
export const selectUserState = createFeatureSelector<fromUser.State>('users');
 
export const selectUserIds = createSelector(
  selectUserState,
  fromUser.selectUserIds
);
export const selectUserEntities = createSelector(
  selectUserState,
  fromUser.selectUserEntities
);
export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAllUsers
);
export const selectUserTotal = createSelector(
  selectUserState,
  fromUser.selectUserTotal
);
export const selectCurrentUserId = createSelector(
  selectUserState,
  fromUser.getSelectedUserId
);
 
export const selectCurrentUser = createSelector(
  selectUserEntities,
  selectCurrentUserId,
  (userEntities, userId) => userEntities[userId]
);

export const selectUserPending = createSelector(
  selectUserState,
  (state) => state.pending);

export const selectUserError = createSelector(
  selectUserState,
  (state) => state.error
);