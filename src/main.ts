import { bootstrapApplication } from '@angular/platform-browser';
import {
  inject,
  isDevMode,
  importProvidersFrom,
  provideEnvironmentInitializer,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { provideStore } from '@ngrx/store';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { provideRouterStore } from "@ngrx/router-store";

import { AppComponent } from '@app/app.component';
import { appRoutes } from '@app/app.routes';
import { reducers } from '@app/store/reducer';
import { LocationEffects } from '@core/store/location/effects';
import { ApiInterceptor } from '@core/interceptors/api.interceptor';
import { ErrorInterceptor } from '@core/interceptors/error.interceptor';
import { FavoritesEffects } from '@core/store/favorites/effects';
import { WINDOW_PROVIDER } from "@core/di/window.provider";
import { NgRxLocalStorageService } from "@core/providers/ng-rx-local-storage.service";
import { CrossTabFavoritesService } from "@core/providers/cross-tab-favorites.service";

bootstrapApplication(AppComponent, {
  providers: [
    provideZonelessChangeDetection(),
    provideRouter(appRoutes),
    provideStore(reducers),
    provideEffects(LocationEffects, FavoritesEffects),
    provideRouterStore(),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      connectInZone: false,
    }),
    importProvidersFrom(MatSnackBarModule),
    provideHttpClient(withInterceptorsFromDi()),
    provideEnvironmentInitializer(() => {
      inject(NgRxLocalStorageService);
      inject(CrossTabFavoritesService);
    }),
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
    WINDOW_PROVIDER,
  ],
}).catch((err) => console.error('Bootstrap failed:', err));
