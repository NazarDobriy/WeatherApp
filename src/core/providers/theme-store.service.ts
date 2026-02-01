import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ThemeActions from '@core/store/theme/actions';
import * as ThemeSelectors from '@core/store/theme/selectors';
import { IThemeState } from '@core/store/theme/state';
import { ThemeType } from "@core/types/theme.type";

@Injectable()
export class ThemeStoreService {
  readonly theme$ = this.store.select(ThemeSelectors.selectMode);
  readonly isCelsius$ = this.store.select(ThemeSelectors.selectTemperature);
  readonly isChartRepresentation$ = this.store.select(ThemeSelectors.selectDailyRepresentation);

  constructor(private store: Store<IThemeState>) {}

  dispatchTemperature(): void {
    this.store.dispatch(ThemeActions.toggleTemperature());
  }

  dispatchDailyRepresentation(): void {
    this.store.dispatch(ThemeActions.toggleDailyRepresentation());
  }

  dispatchSetThemeMode(theme: ThemeType): void {
    this.store.dispatch(ThemeActions.setThemeMode({ theme }));
  }

  dispatchSetTemperature(isCelsius: boolean): void {
    this.store.dispatch(ThemeActions.setTemperature({ isCelsius }));
  }

  dispatchSetDailyRepresentation(isChartRepresentation: boolean): void {
    this.store.dispatch(ThemeActions.setDailyRepresentation({ isChartRepresentation }));
  }
}
