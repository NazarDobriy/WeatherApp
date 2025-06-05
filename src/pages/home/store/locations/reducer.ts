import { createReducer, on } from '@ngrx/store';

import * as LocationsActions from './actions';
import { ILocationsState, locationsInitialState } from './state';

export const locationsReducer = createReducer(
  locationsInitialState,
  on(LocationsActions.getLocations, (state: ILocationsState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(LocationsActions.getLocationsSuccess, (state: ILocationsState, action) => {
    return {
      ...state,
      isLoading: false,
      locations: action.locations
    };
  }),
  on(LocationsActions.getLocationsFailure, (state: ILocationsState, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }),
  on(LocationsActions.clearLocations, () => locationsInitialState)
);
