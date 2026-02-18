import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILocationState } from "./state";
import { ILocation } from '@core/types/location.interface';

const selectLocationFeature = createFeatureSelector<ILocationState>('location');

export const selectLocation = createSelector(
  selectLocationFeature,
  ({ location }: ILocationState): ILocation | null => location,
);

export const selectIsLoadingLocation = createSelector(
  selectLocationFeature,
  ({ isLoading }: ILocationState): boolean => isLoading
);

export const selectFailureLocation = createSelector(
  selectLocationFeature, ({ error }: ILocationState): string | null => error
);

export const isFavoriteLocation = createSelector(
  selectLocationFeature, ({ isFavorite }: ILocationState): boolean => isFavorite,
);
