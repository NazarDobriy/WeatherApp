import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILocationsState } from "./state";
import { ILocation } from '@core/types/location.interface';

const selectFeature = createFeatureSelector<ILocationsState>('locations');

export const selectLocations = createSelector(
  selectFeature,
  ({ locations }: ILocationsState): ILocation[] => locations,
);
export const selectIsLoadingLocations = createSelector(
  selectFeature,
  ({ isLoading }: ILocationsState): boolean => isLoading
);
export const selectFailureLocations = createSelector(
  selectFeature,
  ({ error }: ILocationsState): string | null => error
);
