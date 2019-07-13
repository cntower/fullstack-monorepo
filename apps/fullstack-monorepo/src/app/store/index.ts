import { getSelectors, RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface State {
  router: RouterReducerState<any>;
}

export const selectRouter = createFeatureSelector<
  State,
  RouterReducerState<any>
>('router');

export const {
  selectQueryParams,    // select the current route query params
  selectRouteParams,    // select the current route params
  selectRouteData,      // select the current route data
  selectUrl,            // select the current url
} = getSelectors(selectRouter);

// export const selectRoutePostId = createSelector(
//   selectRouteParams,
//   (state) => state.postId
// );