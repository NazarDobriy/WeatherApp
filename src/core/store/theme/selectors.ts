import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IThemeState } from './state';
import { ThemeType } from "@core/types/theme.type";

const selectThemeFeature = createFeatureSelector<IThemeState>('theme');

export const selectMode = createSelector(
  selectThemeFeature,
  ({ theme }: IThemeState): ThemeType => theme,
);

export const selectTemperature = createSelector(
  selectThemeFeature,
  ({ isCelsius }: IThemeState): boolean => isCelsius,
);

export const selectDailyRepresentation = createSelector(
  selectThemeFeature,
  ({ isChartRepresentation }: IThemeState): boolean => isChartRepresentation,
);
