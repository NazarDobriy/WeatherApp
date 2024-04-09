import { createReducer, on } from '@ngrx/store';

import * as LocationsActions from './actions';
import { locationsInitialState } from './state';

export const locationsReducer = createReducer(
  locationsInitialState,
  on(LocationsActions.getLocations, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(LocationsActions.getLocationsSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      locations: action.locations
    };
  }),
  on(LocationsActions.getLocationsFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  })
);
