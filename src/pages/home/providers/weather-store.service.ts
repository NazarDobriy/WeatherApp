import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as WeatherActions from '../store/weather/actions';
import * as WeatherSelectors from '../store/weather/selectors';

@Injectable()
export class WeatherStoreService {
  weather$ = this.store.select(WeatherSelectors.selectWeather);
  weatherFailure$ = this.store.select(WeatherSelectors.selectFailureWeather);
  isLoadingWeather$ = this.store.select(WeatherSelectors.selectIsLoadingWeather);

  forecasts$ = this.store.select(WeatherSelectors.selectForecasts);
  forecastsFailure$ = this.store.select(WeatherSelectors.selectFailureForecasts);
  isLoadingForecasts$ = this.store.select(WeatherSelectors.selectIsLoadingForecasts);

  constructor(private store: Store) {}

  dispatchWeather(key: string): void {
    this.store.dispatch(WeatherActions.getWeather({ key }));
  }

  dispatchForecasts(key: string): void {
    this.store.dispatch(WeatherActions.getForecasts({ key }));
  }
}
