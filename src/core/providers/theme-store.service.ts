import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as ThemeActions from '../store/theme/actions';
import * as ThemeSelectors from '../store/theme/selectors';

@Injectable()
export class ThemeStoreService {
  isDarkMode$ = this.store.select(ThemeSelectors.selectMode);
  isCelsius$ = this.store.select(ThemeSelectors.selectTemperature);

  constructor(private store: Store) {}

  dispatchMode(): void {
    this.store.dispatch(ThemeActions.toggleThemeMode());
  }

  dispatchTemperature(): void {
    this.store.dispatch(ThemeActions.toggleThemeTemperature());
  }
}
