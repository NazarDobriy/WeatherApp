import { createAction, props } from '@ngrx/store';

import { ILocation } from 'src/core/types/location.interface';

export const getLocation = createAction(
  '[Location] Get Location',
  props<{ geoPosition: GeolocationCoordinates }>()
);
export const getLocationSuccess = createAction(
  '[Location] Get Location success',
  props<{ location: ILocation }>()
);
export const getLocationFailure = createAction(
  '[Location] Get Location failure',
  props<{ error: string }>()
);