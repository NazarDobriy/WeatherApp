import { createReducer, on } from '@ngrx/store';

import * as WeatherActions from './actions';
import { IWeatherState, weatherInitialState } from './state';

export const weatherReducer = createReducer(
  weatherInitialState,
  on(WeatherActions.getWeather, (state: IWeatherState) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: true
      }
    };
  }),
  on(WeatherActions.getWeatherSuccess, (state: IWeatherState, action) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: false,
        data: action.weather
      }
    };
  }),
  on(WeatherActions.getWeatherFailure, (state: IWeatherState, action) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: false,
        error: action.error
      }
    };
  }),
  on(WeatherActions.getForecasts, (state: IWeatherState) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: true
      }
    };
  }),
  on(WeatherActions.getForecastsSuccess, (state: IWeatherState, action) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: false,
        data: action.forecasts
      }
    };
  }),
  on(WeatherActions.getForecastsFailure, (state: IWeatherState, action) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: false,
        error: action.error
      }
    };
  })
);
