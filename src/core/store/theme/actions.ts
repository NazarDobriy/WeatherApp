import { createAction, props } from '@ngrx/store';

import { ThemeType } from "@core/types/theme.type";

export const setThemeMode = createAction(
  '[Theme] Set Theme Mode',
  props<{ theme: ThemeType; }>(),
);

export const setTemperature = createAction(
  '[Theme] Set Temperature',
  props<{ isCelsius: boolean; }>(),
);

export const setDailyRepresentation = createAction(
  '[Theme] Set Daily Forecast Representation',
  props<{ isChartRepresentation: boolean; }>(),
)

export const toggleTemperature = createAction('[Theme] Toggle Temperature');

export const toggleDailyRepresentation = createAction('[Theme] Toggle Daily Representation');
