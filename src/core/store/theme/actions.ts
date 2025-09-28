import { createAction, props } from '@ngrx/store';

export const setThemeMode = createAction(
  '[Theme] Set Theme Mode',
  props<{ isDarkMode: boolean; }>(),
);

export const setTemperature = createAction(
  '[Theme] Set Temperature',
  props<{ isCelsius: boolean; }>(),
);

export const setDailyRepresentation = createAction(
  '[Theme] Set Daily Forecast Representation',
  props<{ isChartRepresentation: boolean; }>(),
)

export const toggleThemeMode = createAction('[Theme] Toggle Theme Mode');

export const toggleTemperature = createAction('[Theme] Toggle Temperature');

export const toggleDailyRepresentation = createAction('[Theme] Toggle Daily Representation');
