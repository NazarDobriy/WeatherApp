import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as WeatherSelectors from '@pages/home/store/weather/selectors';
import { IWeatherState } from '@pages/home/store/weather/state';
import { filterDefined } from '@utils/index';

@Injectable()
export class WeatherStoreService {
  readonly weather$ = this.store.select(WeatherSelectors.selectWeather).pipe(filterDefined);
  readonly weatherFailure$ = this.store.select(WeatherSelectors.selectFailureWeather);
  readonly isLoadingWeather$ = this.store.select(WeatherSelectors.selectIsLoadingWeather);

  readonly forecasts$ = this.store.select(WeatherSelectors.selectForecasts);
  readonly forecastsFailure$ = this.store.select(WeatherSelectors.selectFailureForecasts);
  readonly isLoadingForecasts$ = this.store.select(WeatherSelectors.selectIsLoadingForecasts);

  constructor(private store: Store<IWeatherState>) {}

}
