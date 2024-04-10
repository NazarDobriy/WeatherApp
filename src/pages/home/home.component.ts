import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';

import { WeatherStoreService } from './providers/weather-store.service';
import { IWeather } from './types/weather.interface';
import { IForecast } from './types/forecast.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  forecasts: IForecast[] = [];
  weather: IWeather | null = null;
  isLineChart = false;
  isLoading$ = combineLatest([
    this.weatherStore.isLoadingWeather$,
    this.weatherStore.isLoadingForecasts$
  ]).pipe(map((item) => item.some((value) => value)));
  private destroy$ = new Subject<void>();

  get dayDataset(): number[] {
    return this.forecasts.map((forecast) =>
      parseFloat(forecast.Temperature.Maximum.Value)
    );
  }

  get nightDataset(): number[] {
    return this.forecasts.map((forecast) =>
      parseFloat(forecast.Temperature.Minimum.Value)
    );
  }

  constructor(private weatherStore: WeatherStoreService) {}

  ngOnInit(): void {
    this.handleWeather();
    this.handleForecasts();
  }

  private handleWeather(): void {
    this.weatherStore.weather$
      .pipe(takeUntil(this.destroy$))
      .subscribe((weather) => {
        this.weather = weather;
      });
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
