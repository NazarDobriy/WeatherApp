import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { tap, withLatestFrom } from "rxjs";

import * as ThemeActions from './actions';
import { ThemeStoreService } from "@core/providers/theme-store.service";
import { LocalStorageService } from "@core/providers/local-storage.service";
import { TEMPERATURE_KEY, THEME_KEY, DAILY_REPRESENTATION_KEY } from "@core/constants/storage.constants";

@Injectable()
export class ThemeEffects {
  themeModeStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ThemeActions.setThemeMode),
      tap(({ theme }) => {
        this.localStorageService.set(THEME_KEY, theme);
      })
    );
  }, { dispatch: false });

  themeTemperatureStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ThemeActions.toggleTemperature),
      withLatestFrom(this.themeStore.isCelsius$),
      tap(([, isCelsius]) => {
        this.localStorageService.set(TEMPERATURE_KEY, isCelsius);
      }),
    );
  }, { dispatch: false });

  themeDailyChartRepresentationStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ThemeActions.toggleDailyRepresentation),
      withLatestFrom(this.themeStore.isChartRepresentation$),
      tap(([, isChartRepresentation]) => {
        this.localStorageService.set(DAILY_REPRESENTATION_KEY, isChartRepresentation);
      }),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private themeStore: ThemeStoreService,
    private localStorageService: LocalStorageService,
  ) {}

}
