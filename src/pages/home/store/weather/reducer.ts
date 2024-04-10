import { createReducer, on } from '@ngrx/store';

import * as WeatherActions from './actions';
import { weatherInitialState } from './state';

export const weatherReducer = createReducer(
  weatherInitialState,
  on(WeatherActions.getWeather, (state) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: true
      }
    };
  }),
  on(WeatherActions.getWeatherSuccess, (state, action) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: false,
        data: action.weather
      }
    };
  }),
  on(WeatherActions.getWeatherFailure, (state, action) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: false,
        error: action.error
      }
    };
  }),
  on(WeatherActions.getForecasts, (state) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: true
      }
    };
  }),
  on(WeatherActions.getForecastsSuccess, (state, action) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: false,
        data: action.forecasts
      }
    };
  }),
  on(WeatherActions.getForecastsFailure, (state, action) => {
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
