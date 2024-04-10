import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { WeatherStoreService } from '../../providers/weather-store.service';
import { IForecast } from '../../types/forecast.interface';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html'
})
export class ForecastsComponent implements OnInit, OnDestroy {
  forecasts: IForecast[] = [];
  private destroy$ = new Subject<void>();

  constructor(private weatherStore: WeatherStoreService) {}

  ngOnInit(): void {
    this.handleForecasts();
  }

  private handleForecasts(): void {
    this.weatherStore.forecasts$
      .pipe(takeUntil(this.destroy$))
      .subscribe((forecasts) => {
        this.forecasts = forecasts;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
