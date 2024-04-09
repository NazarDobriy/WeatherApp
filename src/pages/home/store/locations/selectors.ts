import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILocationsState } from "./state";

const selectFeature = createFeatureSelector<ILocationsState>('locations');

export const selectLocations = createSelector(selectFeature, ({ locations }) => locations);
export const selectIsLoadingLocations = createSelector(selectFeature, ({ isLoading }) => isLoading);
export const selectFailureLocations = createSelector(selectFeature, ({ error }) => error);
