import { createAction, props } from "@ngrx/store";

import { IGeoLocation } from "@core/types/geo-location";

export const getNavigation = createAction('[Navigation] Get Navigation');

export const getNavigationSuccess = createAction(
  '[Navigation] Get Navigation success',
  props<{ coords: IGeoLocation; }>(),
);

export const getNavigationFailure = createAction(
  '[Navigation] Get Navigation failure',
  props<{ error: string; }>(),
);
