import { createReducer, on } from '@ngrx/store';

import * as ThemeActions from './actions';
import { IThemeState, themeInitialState } from './state';

export const themeReducer = createReducer(
  themeInitialState,
  on(ThemeActions.toggleDailyRepresentation, (state: IThemeState) => {
    return {
      ...state,
      isChartRepresentation: !state.isChartRepresentation
    };
  }),
  on(ThemeActions.setThemeMode, (state: IThemeState, { theme }) => {
    return { ...state, theme };
  }),
  on(ThemeActions.setTemperature, (state: IThemeState, { isCelsius }) => {
    return { ...state, isCelsius };
  }),
  on(ThemeActions.setDailyRepresentation, (state: IThemeState, { isChartRepresentation }) => {
    return { ...state, isChartRepresentation };
  }),
);
