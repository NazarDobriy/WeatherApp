import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgIf } from '@angular/common';
import { switchMap } from 'rxjs';

import { WeatherStoreService } from './providers/weather-store.service';
import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';
import { LocationStoreService } from '@core/providers/location-store.service';
import { ILocation } from '@core/types/location.interface';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { IFavoriteShortInfo } from '@core/types/favorite.interface';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { temperatureConverter } from '@utils/index';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { KyivGeoLocation } from './consts/location.const';
import { LocationSearchComponent } from '@pages/home/components/location-search/location-search.component';
import { LocationSquareComponent } from '@pages/home/components/location-square/location-square.component';
import { ForecastsComponent } from '@pages/home/components/forecasts/forecasts.component';
import { LineChartComponent } from '@shared/components/line-chart/line-chart.component';
import { HomeFacadeService } from '@pages/home/providers/home-facade.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    NgIf,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    ForecastsComponent,
    LineChartComponent,
    MatSlideToggleModule,
    LocationSearchComponent,
    MatProgressSpinnerModule,
    LocationSquareComponent,
  ],
})
export class HomeComponent implements OnInit {
  location: ILocation | null = null;
  forecasts: IForecast[] = [];
  weather: IWeather | null = null;
  isLineChart = false;
  isFavorite = false;
  dayDataset: number[] = [];
  nightDataset: number[] = [];
  readonly isCelsius$ = this.themeStore.isCelsius$;

  constructor(
    public homeFacadeService: HomeFacadeService,
    private destroyRef: DestroyRef,
    private themeStore: ThemeStoreService,
    private snackBarService: SnackBarService,
    private weatherStore: WeatherStoreService,
    private locationStore: LocationStoreService,
    private favoritesStore: FavoritesStoreService,
  ) {}

  ngOnInit(): void {
    this.handleLocation();
    this.handleWeather();
    this.handleForecasts();
    this.handleGeoPosition();
  }

  addToFavorites(): void {
    if (!!this.location && !!this.weather) {
      this.favoritesStore.dispatchAddShortFavorite({
        id: this.location.Key,
        name: this.location.LocalizedName,
      });
    }
  }

  removeFromFavorites(): void {
    if (!!this.location) {
      this.favoritesStore.dispatchRemoveShortFavorite(this.location.Key);
    }
  }

  private handleGeoPosition(): void {
    if (navigator.geolocation && !this.location) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => this.locationStore.dispatchLocation(position.coords),
        (error: GeolocationPositionError) => {
          this.snackBarService.open(error.message, 'X');
          this.locationStore.dispatchLocation(KyivGeoLocation);
        }
      );
    }
  }

  private handleWeather(): void {
    this.weatherStore.weather$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (weather: IWeather) => this.weather = weather,
    });
  }

  private handleForecasts(): void {
    this.weatherStore.forecasts$.pipe(
      switchMap((forecasts: IForecast[]) => {
        this.forecasts = forecasts;
        return this.themeStore.isCelsius$;
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isCelsius: boolean) => {
        this.dayDataset = this.forecasts.map((forecast: IForecast) => {
          return temperatureConverter(parseFloat(forecast.Temperature.Maximum.Value), isCelsius);
        });

        this.nightDataset = this.forecasts.map((forecast: IForecast) => {
          return temperatureConverter(parseFloat(forecast.Temperature.Minimum.Value), isCelsius);
        });
      },
    });
  }

  private handleLocation(): void {
    this.locationStore.location$.pipe(
      switchMap((location: ILocation) => {
        this.location = location;
        const key = location.Key;
        this.weatherStore.dispatchWeather(key);
        this.weatherStore.dispatchForecasts(key);

        return this.favoritesStore.shortFavorites$;
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (favorites: IFavoriteShortInfo[]) => {
        if (favorites.length > 0 && !!this.location) {
          this.isFavorite = favorites.some((item: IFavoriteShortInfo) => item.id === this.location?.Key);
        }
      },
    });
  }

}
