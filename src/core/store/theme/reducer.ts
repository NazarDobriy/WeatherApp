import { createReducer, on } from '@ngrx/store';

import * as ThemeActions from './actions';
import { IThemeState, themeInitialState } from './state';

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
);
