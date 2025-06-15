import { createAction, props } from '@ngrx/store';

export const setThemeMode = createAction(
  '[Theme] Set Theme Mode',
  props<{ isDarkMode: boolean; }>(),
);
export const setTemperature = createAction(
  '[Theme] Set Temperature',
  props<{ isCelsius: boolean; }>(),
);
export const toggleThemeMode = createAction('[Theme] Toggle Theme Mode');
export const toggleTemperature = createAction('[Temperature] Toggle Temperature');
