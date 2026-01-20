import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILocationsState } from "./state";
import { ILocation } from '@core/types/location.interface';

const selectLocationsFeature = createFeatureSelector<ILocationsState>('locations');

export const selectLocations = createSelector(
  selectLocationsFeature,
  ({ locations }: ILocationsState): ILocation[] => locations,
);

export const selectIsLoadingLocations = createSelector(
  selectLocationsFeature,
  ({ isLoading }: ILocationsState): boolean => isLoading,
);

export const selectFailureLocations = createSelector(
  selectLocationsFeature,
  ({ error }: ILocationsState): string | null => error,
);

export const selectLastSearchedQueryLocations = createSelector(
  selectLocationsFeature,
  ({ lastSearchedQuery }: ILocationsState): string | null => lastSearchedQuery,
);

export const selectDropdownLocations = createSelector(
  selectLocations,
  selectIsLoadingLocations,
  selectLastSearchedQueryLocations,
  (locations: ILocation[], isLoading: boolean, lastSearchedQuery: string | null): Omit<ILocationsState, 'error'> => ({
    locations,
    isLoading,
    lastSearchedQuery,
  })
);
