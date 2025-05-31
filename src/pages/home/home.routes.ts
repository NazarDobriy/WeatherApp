import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';

import { HomeComponent } from '@pages/home/home.component';
import { LocationsEffects } from '@pages/home/store/locations/effects';
import { WeatherEffects } from '@pages/home/store/weather/effects';
import { LocationsStoreService } from '@pages/home/providers/locations-store.service';
import { WeatherService } from '@pages/home/providers/weather.service';
import { WeatherStoreService } from '@pages/home/providers/weather-store.service';
import { LocationsService } from '@pages/home/providers/locations.service';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    providers: [
      provideEffects([LocationsEffects, WeatherEffects]),
      LocationsStoreService,
      WeatherService,
      WeatherStoreService,
      LocationsService,
    ],
    pathMatch: 'full',
  }
];
