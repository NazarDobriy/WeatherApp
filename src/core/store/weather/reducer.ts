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
        isLoading: true,
      },
      forecasts: {
        ...state.forecasts,
        isLoading: true,
      },
    };
  }),
  on(WeatherActions.getWeatherSuccess, (state: IWeatherState, { weather, forecasts }) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: false,
        data: weather,
      },
      forecasts: {
        ...state.forecasts,
        isLoading: false,
        data: forecasts,
      },
    };
  }),
  on(WeatherActions.getWeatherFailure, (state: IWeatherState, { error }) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: false,
        error,
      },
      forecasts: {
        ...state.forecasts,
        isLoading: false,
        error,
      },
    };
  }),
  on(WeatherActions.updateWeather, (state: IWeatherState) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isUpdateLoading: true,
      },
      forecasts: {
        ...state.forecasts,
        isUpdateLoading: true,
      },
    };
  }),
  on(WeatherActions.updateWeatherSuccess, (state: IWeatherState, { weather, forecasts }) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isUpdateLoading: false,
        data: weather,
      },
      forecasts: {
        ...state.forecasts,
        isUpdateLoading: false,
        data: forecasts,
      },
    };
  }),
  on(WeatherActions.updateWeatherFailure, (state: IWeatherState, { error }) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isUpdateLoading: false,
        error,
      },
      forecasts: {
        ...state.forecasts,
        isUpdateLoading: false,
        error,
      },
    };
  }),
);
