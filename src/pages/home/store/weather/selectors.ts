import { createFeatureSelector, createSelector } from "@ngrx/store";

import { IWeatherState } from "./state";
import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';

const selectWeatherFeature = createFeatureSelector<IWeatherState>('weather');

export const selectWeather = createSelector(
  selectWeatherFeature,
  ({ weather }: Pick<IWeatherState, 'weather'>): IWeather | null => weather.data,
);
export const selectIsLoadingWeather = createSelector(
  selectWeatherFeature,
  ({ weather }: Pick<IWeatherState, 'weather'>): boolean => weather.isLoading,
);
export const selectFailureWeather = createSelector(
  selectWeatherFeature,
  ({ weather }: Pick<IWeatherState, 'weather'>): string | null => weather.error,
);

export const selectForecasts = createSelector(
  selectWeatherFeature,
  ({ forecasts }: Pick<IWeatherState, 'forecasts'>): IForecast[] => forecasts.data,
);
export const selectIsLoadingForecasts = createSelector(
  selectWeatherFeature,
  ({ forecasts }: Pick<IWeatherState, 'forecasts'>): boolean => forecasts.isLoading,
);
export const selectFailureForecasts = createSelector(
  selectWeatherFeature,
  ({ forecasts }: Pick<IWeatherState, 'forecasts'>): string | null => forecasts.error
);
