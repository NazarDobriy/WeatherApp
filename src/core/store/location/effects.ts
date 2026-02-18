import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap, withLatestFrom } from 'rxjs';

import * as LocationActions from './actions';
import * as WeatherActions from '@pages/home/store/weather/actions';
import * as NavigationActions from '@core/store/navigation/actions';
import { LocationService } from '@core/providers/location.service';
import { ILocation } from '@core/types/location.interface';
import { NOTIFICATION } from '@core/constants/notification.constants';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { KyivGeoLocation} from "@pages/home/constants/location.constants";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { IFavoriteShortInfo } from "@core/types/favorite.interface";

@Injectable()
export class LocationEffects {
  getLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.getLocation),
      map(() => NavigationActions.getNavigation()),
    );
  });

  getLocationAfterNavigationSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.getNavigationSuccess),
      switchMap(({ coords }) => {
        return this.locationService.getLocation(coords).pipe(
          map((location: ILocation) =>
            LocationActions.getLocationSuccess({ location })
          ),
          catchError((error: Error) =>
            of(LocationActions.getLocationFailure({ error: error.message }))
          )
        );
      })
    );
  });

  getLocationAfterNavigationFailure$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(NavigationActions.getNavigationFailure),
      switchMap(() => {
        return this.locationService.getLocation(KyivGeoLocation).pipe(
          map((location: ILocation) =>
            LocationActions.getLocationSuccess({ location })
          ),
          catchError((error: Error) =>
            of(LocationActions.getLocationFailure({ error: error.message }))
          )
        );
      })
    );
  });

  locationTriggersWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LocationActions.getLocationSuccess,
        LocationActions.changeLocation,
      ),
      map(({ location }) => {
        return WeatherActions.getWeather({ key: location.Key });
      }),
    )
  );

  locationTriggersForecasts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(
        LocationActions.getLocationSuccess,
        LocationActions.changeLocation,
      ),
      map(({ location }) => {
        return WeatherActions.getForecasts({ key: location.Key });
      }),
    )
  );

  isLocationFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        LocationActions.getLocationSuccess,
        LocationActions.changeLocation,
      ),
      switchMap(({ location }) => {
        return this.favoritesStore.shortFavorites$.pipe(
          map((favorites: IFavoriteShortInfo[]) => {
            return { location, favorites };
          }),
        );
      }),
      map(({location, favorites}) => {
        const isFavorite = favorites.some((item: IFavoriteShortInfo) => item.id === location.Key);
        return LocationActions.setIsFavorite({ isFavorite });
      }),
    );
  });

  failureLocation$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(LocationActions.getLocationFailure),
      tap(() => this.snackBarService.open(NOTIFICATION.ERROR_GETTING_LOCATION, 'X')),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private locationService: LocationService,
    private snackBarService: SnackBarService,
    private favoritesStore: FavoritesStoreService,
  ) {}
}
