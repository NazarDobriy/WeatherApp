import { createReducer, on } from '@ngrx/store';

import * as ThemeActions from './actions';
import { themeInitialState } from './state';

export const themeReducer = createReducer(
  themeInitialState,
  on(ThemeActions.toggleThemeMode, (state) => {
    return {
      ...state,
      isDarkMode: !state.isDarkMode
    };
  }),
  on(ThemeActions.toggleThemeTemperature, (state) => {
    return {
      ...state,
      isCelsius: !state.isCelsius
    };
  })
);
