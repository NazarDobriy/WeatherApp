import { createAction, props } from '@ngrx/store';

import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';

export const getWeather = createAction('[Weather] Get Weather', props<{ key: string }>());

export const getWeatherSuccess = createAction(
  '[Weather] Get Weather success',
  props<{ weather: IWeather }>(),
);

export const getWeatherFailure = createAction('[Weather] Get Weather failure', props<{ error: string }>());

export const getForecasts = createAction('[Weather] Get Forecasts', props<{ key: string }>());

export const getForecastsSuccess = createAction(
  '[Weather] Get Forecasts success',
  props<{ forecasts: IForecast[] }>(),
);

export const getForecastsFailure = createAction(
  '[Weather] Get Forecasts failure',
  props<{ error: string }>(),
);

export const updateWeather = createAction('[Weather] Update Weather', props<{ key: string; name: string }>());

export const updateWeatherSuccess = createAction(
  '[Weather] Update Weather success',
  props<{ key: string; name: string; weather: IWeather }>(),
);

export const updateWeatherFailure = createAction(
  '[Weather] Update Weather failure',
  props<{ key: string; name: string; error: string }>(),
);
