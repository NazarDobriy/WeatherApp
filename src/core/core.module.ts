import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { EffectsModule } from '@ngrx/effects';

import { HeaderComponent } from './components/header/header.component';
import { ApiInterceptor } from './interceptors/api.interceptor';
import { FavoritesStoreService } from './providers/favorites-store.service';
import { LocationService } from './providers/location.service';
import { LocationStoreService } from './providers/location-store.service';
import { SnackBarService } from './providers/snack-bar.service';
import { LocationEffects } from './store/location/effects';
import { ErrorHandlerService } from './providers/error-handler.service';
import { NgRxLocalStorageService } from './providers/ng-rx-local-storage.service';
import { ThemeStoreService } from './providers/theme-store.service';
import { ThemeModeComponent } from './components/header/components/theme-mode/theme-mode.component';
import { ThemeTemperatureComponent } from './components/header/components/theme-temperature/theme-temperature.component';

@NgModule({
  declarations: [HeaderComponent, ThemeModeComponent, ThemeTemperatureComponent],
  imports: [
    CommonModule,
    RouterModule,
    EffectsModule.forFeature([LocationEffects])
  ],
  exports: [HeaderComponent],
  providers: [
    FavoritesStoreService,
    LocationService,
    LocationStoreService,
    ThemeStoreService,
    SnackBarService,
    ErrorHandlerService,
    LocationStoreService,
    NgRxLocalStorageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {}
