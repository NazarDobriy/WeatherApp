import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltip } from '@angular/material/tooltip';

import { HomeComponent } from './home.component';
import { HomeFacadeService } from '@pages/home/providers/home-facade.service';
import { MockHomeFacadeService } from '@tests/providers/mock-home-facade.service';
import { WeatherStoreService } from '@pages/home/providers/weather-store.service';
import { MockWeatherStoreService } from '@tests/providers/mock-weather-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { MockLocationStoreService } from '@tests/providers/mock-location-store.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { MockFavoritesStoreService } from '@tests/providers/mock-favorites-store.service';
import { CrossTabFavoritesService } from '@core/providers/cross-tab-favorites.service';
import { MockCrossTabFavoritesService } from '@tests/providers/mock-cross-tab-favorites.service';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { MockThemeStoreService } from '@tests/providers/mock-theme-store.service';
import { MockLocationSearchComponent } from '@tests/components/mock/mock-location-search.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ForecastsComponent } from '@pages/home/components/forecasts/forecasts.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideZonelessChangeDetection(),
        { provide: HomeFacadeService, useClass: MockHomeFacadeService },
        { provide: ThemeStoreService, useClass: MockThemeStoreService },
        { provide: WeatherStoreService, useClass: MockWeatherStoreService },
        { provide: LocationStoreService, useClass: MockLocationStoreService },
        { provide: FavoritesStoreService, useClass: MockFavoritesStoreService },
        { provide: CrossTabFavoritesService, useClass: MockCrossTabFavoritesService },
      ],
    })
      .overrideComponent(HomeComponent, {
        set: {
          imports: [
            AsyncPipe,
            TemperatureConverterPipe,
            ButtonComponent,
            MockLocationSearchComponent,
            MatIconModule,
            MatSlideToggleModule,
            NgOptimizedImage,
            MatTooltip,
            ForecastsComponent,
          ],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
