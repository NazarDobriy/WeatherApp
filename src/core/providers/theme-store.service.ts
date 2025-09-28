import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ThemeActions from '@core/store/theme/actions';
import * as ThemeSelectors from '@core/store/theme/selectors';
import { IThemeState } from '@core/store/theme/state';

@Injectable()
export class ThemeStoreService {
  readonly isDarkMode$ = this.store.select(ThemeSelectors.selectMode);
  readonly isCelsius$ = this.store.select(ThemeSelectors.selectTemperature);
  readonly isChartRepresentation$ = this.store.select(ThemeSelectors.selectDailyRepresentation);

  constructor(private store: Store<IThemeState>) {}

  dispatchMode(): void {
    this.store.dispatch(ThemeActions.toggleThemeMode());
  }

  dispatchTemperature(): void {
    this.store.dispatch(ThemeActions.toggleTemperature());
  }

  dispatchDailyRepresentation(): void {
    this.store.dispatch(ThemeActions.toggleDailyRepresentation());
  }

  dispatchSetThemeMode(isDarkMode: boolean): void {
    this.store.dispatch(ThemeActions.setThemeMode({ isDarkMode }));
  }

  dispatchSetTemperature(isCelsius: boolean): void {
    this.store.dispatch(ThemeActions.setTemperature({ isCelsius }));
  }

  dispatchSetDailyRepresentation(isChartRepresentation: boolean): void {
    this.store.dispatch(ThemeActions.setDailyRepresentation({ isChartRepresentation }));
  }
}
