import { Injectable } from '@angular/core';
import { combineLatest, map } from 'rxjs';

import { WeatherStoreService } from '@pages/home/providers/weather-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';

@Injectable()
export class HomeFacadeService {
  readonly isLoading$ = combineLatest([
    this.weatherStore.isLoadingWeather$,
    this.weatherStore.isLoadingForecasts$,
    this.locationStore.isLoadingLocation$
  ]).pipe(
    map(([isLoadingWeather, isLoadingForecasts, isLoadingLocation]) => {
      return isLoadingWeather || isLoadingForecasts || isLoadingLocation;
    })
  );

  constructor(
    private weatherStore: WeatherStoreService,
    private locationStore: LocationStoreService,
  ) { }
}
