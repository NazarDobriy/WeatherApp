import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { HomeComponent } from './home.component';
import { LocationsService } from './providers/locations.service';
import { LocationsEffects } from './store/locations/effects';
import { LocationsStoreService } from './providers/locations-store.service';
import { LocationSearchComponent } from './components/location-search/location-search.component';
import { SnackBarService } from './providers/snack-bar.service';
import { WeatherService } from './providers/weather.service';
import { WeatherEffects } from './store/weather/effects';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [HomeComponent, LocationSearchComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([LocationsEffects, WeatherEffects]),
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
    LocationsService,
    LocationsStoreService,
    WeatherService,
    SnackBarService
  ]
})
export class HomeModule {}
