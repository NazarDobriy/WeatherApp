import { createAction, props } from '@ngrx/store';

import { IWeather } from '../../types/weather.interface';
import { IForecast } from '../../types/forecast.interface';

export const getWeather = createAction(
  '[Weather] Get Weather',
  props<{ key: string }>()
);
export const getWeatherSuccess = createAction(
  '[Weather] Get Weather success',
  props<{ weather: IWeather }>()
);
export const getWeatherFailure = createAction(
  '[Weather] Get Weather failure',
  props<{ error: string }>()
);

export const getForecasts = createAction(
  '[Weather] Get Forecasts',
  props<{ key: string }>()
);
export const getForecastsSuccess = createAction(
  '[Weather] Get Forecasts success',
  props<{ forecasts: IForecast[] }>()
);
export const getForecastsFailure = createAction(
  '[Weather] Get Forecasts failure',
  props<{ error: string }>()
);
