import { createAction, props } from '@ngrx/store';

import { ILocation } from '@core/types/location.interface';

export const getLocation = createAction('[Location] Get Location');

export const getLocationSuccess = createAction(
  '[Location] Get Location success',
  props<{ location: ILocation }>()
);

export const getLocationFailure = createAction(
  '[Location] Get Location failure',
  props<{ error: string }>()
);

export const changeLocation = createAction(
  '[Location] Change Location',
  props<{ location: ILocation }>()
);

export const setIsFavorite = createAction(
  '[Location] Define Favorite Location',
  props<{ isFavorite: boolean; }>(),
);

export const resetLocation = createAction('[Location] Reset Location',);
