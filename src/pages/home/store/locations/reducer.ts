import { createReducer, on } from '@ngrx/store';

import * as LocationsActions from './actions';
import { ILocationsState, locationsInitialState } from './state';

export const locationsReducer = createReducer(
  locationsInitialState,
  on(LocationsActions.getLocations, (state: ILocationsState, { query }) => {
    return {
      ...state,
      isLoading: true,
      lastSearchedQuery: query,
    };
  }),
  on(LocationsActions.getLocationsSuccess, (state: ILocationsState, { locations }) => {
    return {
      ...state,
      isLoading: false,
      locations,
    };
  }),
  on(LocationsActions.getLocationsFailure, (state: ILocationsState, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  on(LocationsActions.clearLocations, () => locationsInitialState),
);
