import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IThemeState } from './state';

const selectThemeFeature = createFeatureSelector<IThemeState>('theme');

export const selectMode = createSelector(
  selectThemeFeature,
  ({ isDarkMode }: IThemeState): boolean => isDarkMode,
);

export const selectTemperature = createSelector(
  selectThemeFeature,
  ({ isCelsius }: IThemeState): boolean => isCelsius,
);

export const selectDailyRepresentation = createSelector(
  selectThemeFeature,
  ({ isChartRepresentation }: IThemeState): boolean => isChartRepresentation,
);
