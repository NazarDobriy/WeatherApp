import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, combineLatest, map, takeUntil } from 'rxjs';

import { WeatherStoreService } from './providers/weather-store.service';
import { IWeather } from './types/weather.interface';
import { IForecast } from './types/forecast.interface';
import { LocationStoreService } from '@core/providers/location-store.service';
import { ILocation } from '@core/types/location.interface';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { IFavorite } from '@core/types/favorite.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { temperatureConverter } from '@utils/index';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { KyivGeoLocation } from './consts/location.const';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  location: ILocation | null = null;
  forecasts: IForecast[] = [];
  weather: IWeather | null = null;
  isLineChart = false;
  isLoading$ = combineLatest([
    this.weatherStore.isLoadingWeather$,
    this.weatherStore.isLoadingForecasts$,
    this.locationStore.isLoadingLocation$
  ]).pipe(
    map(([isLoadingWeather, isLoadingForecasts, isLoadingLocation]) => {
      return isLoadingWeather || isLoadingForecasts || isLoadingLocation;
    })
  );
  isCelsius$ = this.themeStore.isCelsius$;
  private isCelsius = true;
  private favorites: IFavorite[] = [];
  private destroy$ = new Subject<void>();

  get dayDataset(): number[] {
    return this.forecasts.map((forecast) =>
      temperatureConverter(
        parseFloat(forecast.Temperature.Maximum.Value),
        this.isCelsius
      )
    );
  }

  get nightDataset(): number[] {
    return this.forecasts.map((forecast) =>
      temperatureConverter(
        parseFloat(forecast.Temperature.Minimum.Value),
        this.isCelsius
      )
    );
  }

  get isFavorite(): boolean {
    if (this.favorites.length > 0 && this.location) {
      return this.favorites.some(
        (favorite) => favorite.id === this.location?.Key
      );
    }
    return false;
  }

  constructor(
    private themeStore: ThemeStoreService,
    private snackBarService: SnackBarService,
    private weatherStore: WeatherStoreService,
    private locationStore: LocationStoreService,
    private favoritesStore: FavoritesStoreService
  ) {}

  ngOnInit(): void {
    this.handleLocation();
    this.handleWeather();
    this.handleForecasts();
    this.handleFavorites();
    this.handleTemperature();
    this.handleGeoPosition();
  }

  addToFavorites(): void {
    if (this.location && this.weather) {
      this.favoritesStore.dispatchFavoriteAdd({
        id: this.location.Key,
        name: this.location.LocalizedName,
        weatherText: this.weather.WeatherText,
        temperature: this.weather.Temperature.Metric
      });
    }
  }

  removeFromFavorites(): void {
    if (this.location) {
      this.favoritesStore.dispatchFavoriteRemove(this.location.Key);
    }
  }

  private handleGeoPosition(): void {
    if (navigator.geolocation && !this.location) {
      navigator.geolocation.getCurrentPosition(
        (position) => this.locationStore.dispatchLocation(position.coords),
        (error) => {
          this.snackBarService.open(error.message, 'X');
          this.locationStore.dispatchLocation(KyivGeoLocation);
        }
      );
    }
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

  private handleLocation(): void {
    this.locationStore.location$
      .pipe(takeUntil(this.destroy$))
      .subscribe((location) => {
        this.location = location;
        const key = location.Key;
        this.weatherStore.dispatchWeather(key);
        this.weatherStore.dispatchForecasts(key);
      });
  }

  private handleFavorites(): void {
    this.favoritesStore.favorites$
      .pipe(takeUntil(this.destroy$))
      .subscribe((favorites) => {
        this.favorites = favorites;
      });
  }

  private handleTemperature(): void {
    this.themeStore.isCelsius$
      .pipe(takeUntil(this.destroy$))
      .subscribe((isCelsius) => (this.isCelsius = isCelsius));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
