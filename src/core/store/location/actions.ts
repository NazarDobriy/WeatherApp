import { createAction, props } from '@ngrx/store';

import { IGeoLocation } from '@core/types/geo-location';
import { ILocation } from '@core/types/location.interface';

export const getLocation = createAction(
  '[Location] Get Location',
  props<{ geoPosition: IGeoLocation }>()
);

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
