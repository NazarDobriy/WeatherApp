import { ChangeDetectionStrategy, Component, computed, DestroyRef, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatTooltip } from "@angular/material/tooltip";
import { Title } from '@angular/platform-browser';

import { WeatherStoreService } from './providers/weather-store.service';
import { IWeather } from '@core/types/weather.interface';
import { IForecast } from '@core/types/forecast.interface';
import { LocationStoreService } from '@core/providers/location-store.service';
import { ILocation } from '@core/types/location.interface';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { IFavoriteShortInfo } from '@core/types/favorite.interface';
import { filterDefined, temperatureConverter } from '@utils/index';
import { LocationSearchComponent } from '@pages/home/components/location-search/location-search.component';
import { ForecastsComponent } from '@pages/home/components/forecasts/forecasts.component';
import { LineChartComponent } from '@shared/components/line-chart/line-chart.component';
import { HomeFacadeService } from '@pages/home/providers/home-facade.service';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';
import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonVariant, ButtonWidth } from "@shared/components/button/types/button.enum";
import { CrossTabFavoritesService } from "@core/providers/cross-tab-favorites.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    AsyncPipe,
    MatIconModule,
    ForecastsComponent,
    LineChartComponent,
    MatSlideToggleModule,
    LocationSearchComponent,
    MatProgressSpinnerModule,
    TemperatureConverterPipe,
    NgOptimizedImage,
    ButtonComponent,
    MatTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends TemperatureUnit implements OnInit {
  readonly buttonWidth = ButtonWidth;
  readonly buttonVariant = ButtonVariant;
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
    private titleService: Title,
    private destroyRef: DestroyRef,
    private weatherStore: WeatherStoreService,
    private locationStore: LocationStoreService,
    private favoritesStore: FavoritesStoreService,
    private crossTabFavoritesService: CrossTabFavoritesService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.titleService.setTitle('Home | Weather');
    this.handleLocation();
    this.handleWeather();
    this.handleForecasts();
    this.handleTemperature();
    this.handleFavoriteLocation();
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
      const shortFavorite: IFavoriteShortInfo = {
        id: location.Key,
        name: location.LocalizedName,
        isLoading: false,
        error: null,
      };

      this.favoritesStore.dispatchAddShortFavorite(shortFavorite);
      this.crossTabFavoritesService.send({
        type: 'add',
        payload: shortFavorite,
      });
    }
  }

  removeFromFavorites(): void {
    const location = this.location();

    if (location) {
      this.favoritesStore.dispatchRemoveShortFavorite(location.Key, location.LocalizedName);
      this.crossTabFavoritesService.send({
        type: 'remove',
        payload: {
          id: location.Key,
          name: location.LocalizedName,
        },
      });
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
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (forecasts: IForecast[]) => this.forecasts.set(forecasts),
    });
  }

  private handleTemperature(): void {
    this.themeStore.isCelsius$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isCelsius: boolean) => this.isCelsius.set(isCelsius),
    });
  }

  private handleLocation(): void {
    this.locationStore.location$.pipe(
      filterDefined,
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (location: ILocation) => this.location.set(location),
    });
  }

  private handleFavoriteLocation(): void {
    this.locationStore.isFavoriteLocation$.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe({
      next: (isFavorite: boolean) => this.isFavorite.set(isFavorite),
    });
  }

  private getTemperatureDataset(selector: (forecast: IForecast) => string): number[] {
    const isCelsius = this.isCelsius();
    const forecasts = this.forecasts();

    return forecasts.map((forecast: IForecast) => {
      return temperatureConverter(parseFloat(selector(forecast)), isCelsius);
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
