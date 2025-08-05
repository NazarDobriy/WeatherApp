import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppComponent } from '@app/app.component';
import { appRoutes } from '@app/app.routes';
import { reducers } from '@app/store/reducer';
import { ThemeStoreService } from '@core/providers/theme-store.service';
import { NgRxLocalStorageService } from '@core/providers/ng-rx-local-storage.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { LocationService } from '@core/providers/location.service';
import { LocationEffects } from '@core/store/location/effects';
import { ApiInterceptor } from '@core/interceptors/api.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { FavoritesService } from '@core/providers/favorites.service';
import { FavoritesEffects } from '@core/store/favorites/effects';
import { WeatherService } from '@core/providers/weather.service';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideStore(reducers),
    provideEffects(LocationEffects, FavoritesEffects),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      connectInZone: true,
    }),
    provideAnimations(),
    importProvidersFrom(MatSnackBarModule),
    provideHttpClient(withInterceptorsFromDi()),
    ThemeStoreService,
    NgRxLocalStorageService,
    FavoritesStoreService,
    SnackBarService,
    LocationStoreService,
    LocationService,
    FavoritesService,
    WeatherService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
}).catch((err) => console.error('Bootstrap failed:', err));
