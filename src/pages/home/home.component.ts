import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';

import { WeatherStoreService } from './providers/weather-store.service';
import { IWeather } from './types/weather.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  weather: IWeather | null = null;
  isLoading$ = combineLatest([
    this.weatherStore.isLoadingWeather$,
    this.weatherStore.isLoadingForecasts$
  ]).pipe(map((item) => item.some((value) => value)));
  private destroy$ = new Subject<void>();

  constructor(private weatherStore: WeatherStoreService) {}

  ngOnInit(): void {
    this.handleWeather();
  }

  private handleWeather(): void {
    this.weatherStore.weather$
      .pipe(takeUntil(this.destroy$))
      .subscribe((weather) => {
        this.weather = weather;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
