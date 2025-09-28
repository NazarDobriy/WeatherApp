import { createReducer, on } from '@ngrx/store';

import * as ThemeActions from './actions';
import { IThemeState, themeInitialState } from './state';
import { setDailyRepresentation } from './actions';

export const themeReducer = createReducer(
  themeInitialState,
  on(ThemeActions.toggleThemeMode, (state: IThemeState) => {
    return {
      ...state,
      isDarkMode: !state.isDarkMode
    };
  }),
  on(ThemeActions.toggleTemperature, (state: IThemeState) => {
    return {
      ...state,
      isCelsius: !state.isCelsius
    };
  }),
  on(ThemeActions.toggleDailyRepresentation, (state: IThemeState) => {
    return {
      ...state,
      isChartRepresentation: !state.isChartRepresentation
    };
  }),
  on(ThemeActions.setThemeMode, (state: IThemeState, action) => {
    return {
      ...state,
      isDarkMode: action.isDarkMode,
    };
  }),
  on(ThemeActions.setTemperature, (state: IThemeState, action) => {
    return {
      ...state,
      isCelsius: action.isCelsius,
    };
  }),
  on(ThemeActions.setDailyRepresentation, (state: IThemeState, action) => {
    return {
      ...state,
      isChartRepresentation: action.isChartRepresentation,
    };
  }),
);
