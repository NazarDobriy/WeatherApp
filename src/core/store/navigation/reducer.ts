import { createReducer, on } from "@ngrx/store";

import * as NavigationActions from './actions';
import { INavigationState, navigationInitialState } from "@core/store/navigation/state";
import { KyivGeoLocation } from "@pages/home/constants/location.constants";

export const navigationReducer = createReducer(
  navigationInitialState,
  on(NavigationActions.getNavigationSuccess, (state: INavigationState, { coords }) => {
    return { ...state, coords };
  }),
  on(NavigationActions.getNavigationFailure, (state: INavigationState, { error }) => {
    return {
      ...state,
      coords: KyivGeoLocation,
      error,
    };
  }),
);
