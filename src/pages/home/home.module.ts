import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';

import { HomeComponent } from './home.component';
import { LocationsService } from './providers/locations.service';
import { LocationsEffects } from './store/locations/effects';
import { LocationsStoreService } from './providers/locations-store.service';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { WeatherService } from './providers/weather.service';
import { WeatherEffects } from './store/weather/effects';
import { WeatherStoreService } from './providers/weather-store.service';
import { SharedModule } from '@shared/shared.module';
import { ForecastsComponent } from './components/forecasts/forecasts.component';
import { ForecastCardComponent } from './components/forecast-card/forecast-card.component';
import { LocationSquareComponent } from './components/location-square/location-square.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, LocationSearchComponent, ForecastsComponent, ForecastCardComponent, LocationSquareComponent],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([LocationsEffects, WeatherEffects])
  ],
  providers: [
    LocationsService,
    LocationsStoreService,
    WeatherService,
    WeatherStoreService
  ]
})
export class HomeModule {}
