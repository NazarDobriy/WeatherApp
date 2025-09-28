import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IThemeState } from './state';

const selectFeature = createFeatureSelector<IThemeState>('theme');

export const selectMode = createSelector(
  selectFeature,
  ({ isDarkMode }: IThemeState): boolean => isDarkMode,
);

export const selectTemperature = createSelector(
  selectFeature,
  ({ isCelsius }: IThemeState): boolean => isCelsius,
);

export const selectDailyRepresentation = createSelector(
  selectFeature,
  ({ isChartRepresentation }: IThemeState): boolean => isChartRepresentation,
);
