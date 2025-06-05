import { createReducer, on } from '@ngrx/store';

import * as LocationActions from './actions';
import { ILocationState, locationInitialState } from './state';

export const locationReducer = createReducer(
  locationInitialState,
  on(LocationActions.getLocation, (state: ILocationState) => {
    return {
      ...state,
      isLoading: true
    };
  }),
  on(LocationActions.getLocationSuccess, (state: ILocationState, action) => {
    return {
      ...state,
      isLoading: false,
      location: action.location
    };
  }),
  on(LocationActions.getLocationFailure, (state: ILocationState, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error
    };
  }),
  on(LocationActions.changeLocation, (state: ILocationState, action) => {
    return {
      ...state,
      location: action.location
    }
  })
);
