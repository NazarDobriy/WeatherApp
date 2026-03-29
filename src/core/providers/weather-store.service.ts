import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as WeatherSelectors from '@core/store/weather/selectors';
import * as WeatherActions from '@core/store/weather/actions';
import { IWeatherState } from '@core/store/weather/state';
import { filterDefined } from '@utils/index';

@Injectable({
  providedIn: 'root',
})
export class WeatherStoreService {
  readonly weather$ = this.store.select(WeatherSelectors.selectWeather).pipe(filterDefined);
  readonly weatherFailure$ = this.store.select(WeatherSelectors.selectFailureWeather);
  readonly isLoadingWeather$ = this.store.select(WeatherSelectors.selectIsLoadingWeather);

  readonly forecasts$ = this.store.select(WeatherSelectors.selectForecasts);
  readonly forecastsFailure$ = this.store.select(WeatherSelectors.selectFailureForecasts);
  readonly isLoadingForecasts$ = this.store.select(WeatherSelectors.selectIsLoadingForecasts);

  readonly isLoadingUpdateWeather$ = this.store.select(WeatherSelectors.selectIsLoadingUpdateWeather);

  constructor(private store: Store<IWeatherState>) {}

  dispatchUpdateWeather(key: string, name: string): void {
    this.store.dispatch(WeatherActions.updateWeather({ key, name }));
  }
}
