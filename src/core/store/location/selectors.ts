import { createFeatureSelector, createSelector } from "@ngrx/store";

import { ILocationState } from "./state";

const selectFeature = createFeatureSelector<ILocationState>('location');

export const selectLocation = createSelector(selectFeature, ({ location }) => location);
export const selectIsLoadingLocation = createSelector(selectFeature, ({ isLoading }) => isLoading);
export const selectFailureLocation = createSelector(selectFeature, ({ error }) => error);
