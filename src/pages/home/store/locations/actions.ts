import { createAction, props } from '@ngrx/store';

import { ILocation } from 'src/core/types/location.interface';

export const getLocations = createAction(
  '[Locations] Get Locations',
  props<{ query: string }>()
);
export const getLocationsSuccess = createAction(
  '[Locations] Get Locations success',
  props<{ locations: ILocation[] }>()
);
export const getLocationsFailure = createAction(
  '[Locations] Get Locations failure',
  props<{ error: string }>()
);
