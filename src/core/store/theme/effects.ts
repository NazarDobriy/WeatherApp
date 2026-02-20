import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { distinctUntilChanged, map, tap, withLatestFrom } from "rxjs";

import * as ThemeActions from './actions';
import { ThemeType } from "@core/types/theme.type";
import { ThemeStoreService } from "@core/providers/theme-store.service";
import { LocalStorageService } from "@core/providers/local-storage.service";
import { TEMPERATURE_KEY, THEME_KEY, DAILY_REPRESENTATION_KEY } from "@core/constants/storage.constants";

@Injectable()
export class ThemeEffects {
  themeModeStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ThemeActions.setThemeMode),
      map(({ theme }) => theme),
      distinctUntilChanged(),
      tap((theme: ThemeType) => this.localStorageService.set(THEME_KEY, theme))
    );
  }, { dispatch: false });

  themeTemperatureStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ThemeActions.setTemperature),
      map(({ isCelsius }) => isCelsius),
      distinctUntilChanged(),
      tap((isCelsius: boolean) => this.localStorageService.set(TEMPERATURE_KEY, isCelsius)),
    );
  }, { dispatch: false });

  themeDailyChartRepresentationStorage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ThemeActions.toggleDailyRepresentation),
      withLatestFrom(this.themeStore.isChartRepresentation$),
      map(([, isChartRepresentation]) => isChartRepresentation),
      tap((isChartRepresentation: boolean) => this.localStorageService.set(DAILY_REPRESENTATION_KEY, isChartRepresentation)),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private themeStore: ThemeStoreService,
    private localStorageService: LocalStorageService,
  ) {}

}
