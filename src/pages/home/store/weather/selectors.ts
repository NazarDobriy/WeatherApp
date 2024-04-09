import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IWeatherState } from "./state";

const selectFeature = createFeatureSelector<IWeatherState>('weather');

export const selectWeather = createSelector(selectFeature, ({ weather }) => weather.data);
export const selectIsLoadingWeather = createSelector(selectFeature, ({ weather }) => weather.isLoading);
export const selectFailureWeather = createSelector(selectFeature, ({ weather }) => weather.error);

export const selectForecasts = createSelector(selectFeature, ({ forecasts }) => forecasts.data);
export const selectIsLoadingForecasts = createSelector(selectFeature, ({ forecasts }) => forecasts.isLoading);
export const selectFailureForecasts = createSelector(selectFeature, ({ forecasts }) => forecasts.error);
