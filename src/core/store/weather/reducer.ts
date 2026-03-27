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
    };
  }),
  on(WeatherActions.getWeatherSuccess, (state: IWeatherState, { weather }) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isLoading: false,
        data: weather,
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
    };
  }),
  on(WeatherActions.updateWeather, (state: IWeatherState) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isUpdateLoading: true,
      },
    };
  }),
  on(WeatherActions.updateWeatherSuccess, (state: IWeatherState, { weather }) => {
    return {
      ...state,
      weather: {
        ...state.weather,
        isUpdateLoading: false,
        data: weather,
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
    };
  }),
  on(WeatherActions.getForecasts, (state: IWeatherState) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: true,
      },
    };
  }),
  on(WeatherActions.getForecastsSuccess, (state: IWeatherState, { forecasts }) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: false,
        data: forecasts,
      },
    };
  }),
  on(WeatherActions.getForecastsFailure, (state: IWeatherState, { error }) => {
    return {
      ...state,
      forecasts: {
        ...state.forecasts,
        isLoading: false,
        error,
      },
    };
  }),
);
