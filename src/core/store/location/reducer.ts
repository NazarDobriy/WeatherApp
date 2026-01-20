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
  on(LocationActions.getLocationSuccess, (state: ILocationState, { location }) => {
    return {
      ...state,
      isLoading: false,
      location
    };
  }),
  on(LocationActions.getLocationFailure, (state: ILocationState, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  on(LocationActions.changeLocation, (state: ILocationState, { location }) => {
    return { ...state, location };
  })
);
