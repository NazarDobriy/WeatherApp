import { createReducer, on } from '@ngrx/store';

import * as LocationActions from './actions';
import { locationInitialState } from './state';

export const locationReducer = createReducer(
  locationInitialState,
  on(LocationActions.getLocation, (state) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(LocationActions.getLocationSuccess, (state, action) => {
    return {
      ...state,
      isLoading: false,
      location: action.location
    };
  }),
  on(LocationActions.getLocationFailure, (state, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  })
);
