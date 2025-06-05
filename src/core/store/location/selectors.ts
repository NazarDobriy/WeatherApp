import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILocationState } from "./state";
import { ILocation } from '@core/types/location.interface';

const selectFeature = createFeatureSelector<ILocationState>('location');

export const selectLocation = createSelector(
  selectFeature,
  ({ location }: ILocationState): ILocation | null => location,
);
export const selectIsLoadingLocation = createSelector(
  selectFeature,
  ({ isLoading }: ILocationState): boolean => isLoading
);
export const selectFailureLocation = createSelector(
  selectFeature, ({ error }: ILocationState): string | null => error
);
