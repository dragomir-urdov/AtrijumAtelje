import { getSelectors } from '@ngrx/router-store';

export const {
  selectCurrentRoute,
  selectFragment,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectRouteParam,
  selectRouteParams,
  selectUrl,
} = getSelectors();
