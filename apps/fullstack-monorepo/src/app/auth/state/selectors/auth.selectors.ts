import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../reducers/auth.reducer'

const selectAuthState = createFeatureSelector<State>('auth');

export const selectAuthPending = createSelector(
  selectAuthState,
  (state) => state.pending);

export const selectAuthError = createSelector(
  selectAuthState,
  (state) => state.error
);

export const selectAuthUser = createSelector(
  selectAuthState,
  (state) => state.user
);