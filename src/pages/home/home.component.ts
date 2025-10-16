import { ChangeDetectionStrategy, Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';
import { switchMap } from 'rxjs';

import { WeatherStoreService } from './providers/weather-store.service';
import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';
import { LocationStoreService } from '@core/providers/location-store.service';
import { ILocation } from '@core/types/location.interface';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { IFavoriteShortInfo } from '@core/types/favorite.interface';
import { temperatureConverter } from '@utils/index';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { KyivGeoLocation } from './consts/location.constants';
import { LocationSearchComponent } from '@pages/home/components/location-search/location-search.component';
import { LocationSquareComponent } from '@pages/home/components/location-square/location-square.component';
import { ForecastsComponent } from '@pages/home/components/forecasts/forecasts.component';
import { LineChartComponent } from '@shared/components/line-chart/line-chart.component';
import { HomeFacadeService } from '@pages/home/providers/home-facade.service';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    ForecastsComponent,
    LineChartComponent,
    MatSlideToggleModule,
    LocationSearchComponent,
    MatProgressSpinnerModule,
    LocationSquareComponent,
    TemperatureConverterPipe,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends TemperatureUnit implements OnInit {
  readonly location = signal<ILocation | null>(null);
  readonly forecasts = signal<IForecast[]>([]);
  readonly weather = signal<IWeather | null>(null);
  readonly isLineChart = signal<boolean>(false);
  readonly isFavorite = signal<boolean>(false);
  readonly dayDataset = computed<number[]>(() =>
    this.getTemperatureDataset((forecast: IForecast) => forecast.Temperature.Maximum.Value),
  );
  readonly nightDataset = computed<number[]>(() =>
    this.getTemperatureDataset((forecast: IForecast) => forecast.Temperature.Minimum.Value),
  );
  readonly temperature = signal<number | null>(null);

  constructor(
    public homeFacadeService: HomeFacadeService,
    private destroyRef: DestroyRef,
    private snackBarService: SnackBarService,
    private weatherStore: WeatherStoreService,
    private locationStore: LocationStoreService,
    private favoritesStore: FavoritesStoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.handleLocation();
    this.handleWeather();
    this.handleForecasts();
    this.handleGeoPosition();
    this.listenDailyRepresentation();
  }

  toggleLineChart(): void {
    this.isLineChart.update((item: boolean) => !item);
    this.themeStore.dispatchDailyRepresentation();
  }

  addToFavorites(): void {
    const location = this.location();
    const weather = this.weather();

    if (location && weather) {
      this.favoritesStore.dispatchAddShortFavorite({
        id: location.Key,
        name: location.LocalizedName,
      });
    }
  }

  removeFromFavorites(): void {
    const location = this.location();

    if (location) {
      this.favoritesStore.dispatchRemoveShortFavorite(location.Key);
    }
  }

  private handleGeoPosition(): void {
    if (navigator.geolocation && !this.location()) {
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
      next: (weather: IWeather) => {
        this.weather.set(weather);
        this.temperature.set(parseFloat(weather.Temperature.Metric.Value));
      },
    });
  }

  private handleForecasts(): void {
    this.weatherStore.forecasts$.pipe(
      switchMap((forecasts: IForecast[]) => {
        this.forecasts.set(forecasts);
        return this.themeStore.isCelsius$;
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isCelsius: boolean) => this.isCelsius.set(isCelsius),
    });
  }

  private handleLocation(): void {
    this.locationStore.location$.pipe(
      switchMap((location: ILocation) => {
        this.location.set(location);
        const key = location.Key;
        this.weatherStore.dispatchWeather(key);
        this.weatherStore.dispatchForecasts(key);

        return this.favoritesStore.shortFavorites$;
      }),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (favorites: IFavoriteShortInfo[]) => {
        const location = this.location();

        if (location) {
          this.isFavorite.set(favorites.some((item: IFavoriteShortInfo) => item.id === location.Key));
        }
      },
    });
  }

  private getTemperatureDataset(selector: (forecast: IForecast) => string): number[] {
    return this.forecasts().map((forecast: IForecast) => {
      return temperatureConverter(parseFloat(selector(forecast)), this.isCelsius());
    });
  }

  private listenDailyRepresentation(): void {
    this.themeStore.isChartRepresentation$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isChartRepresentation: boolean) => this.isLineChart.set(isChartRepresentation),
    });
  }

}
