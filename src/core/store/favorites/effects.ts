import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, filter, map, of, tap, withLatestFrom } from 'rxjs';

import * as FavoritesActions from '@core/store/favorites/actions';
import { FavoritesService } from '@core/providers/favorites.service';
import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { NOTIFICATION } from '@core/constants/notification.constants';
import { WeatherService } from "@core/providers/weather.service";
import { IWeather } from "@core/types/weather.interface";
import { minLoadingTime } from "@utils/index";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { PAGE_KEY, REFRESH_KEY } from "@core/constants/loading.constants";

@Injectable()
export class FavoritesEffects {
  getDetailedFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.getDetailedFavorites),
      withLatestFrom(this.favoritesStore.shortFavorites$),
      exhaustMap(([{ loadingKey }, shortFavorites]) => {
        return this.favoritesService.getDetailedFavorites(shortFavorites).pipe(
          map((detailedFavorites: IFavoriteDetailedInfo[]) =>
            FavoritesActions.getDetailedFavoritesSuccess({ detailedFavorites, loadingKey }),
          ),
          catchError((error: Error) =>
            of(FavoritesActions.getDetailedFavoritesFailure({ error: error.message, loadingKey })),
          ),
          minLoadingTime(300),
        );
      })
    );
  });

  failureDetailedFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.getDetailedFavoritesFailure),
      filter(({ loadingKey }) => loadingKey === PAGE_KEY),
      tap(() => this.snackBarService.open(NOTIFICATION.ERROR_GETTING_FAVOURITES, 'X')),
    );
  }, { dispatch: false });

  successUpdateDetailedFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.getDetailedFavoritesSuccess),
      filter(({ loadingKey }) => loadingKey === REFRESH_KEY),
      tap(() => {
        return this.snackBarService.open(NOTIFICATION.SUCCESS_UPDATING_FAVOURITES,'X');
      }),
    );
  }, { dispatch: false });

  failureUpdateDetailedFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.getDetailedFavoritesFailure),
      filter(({ loadingKey }) => loadingKey === REFRESH_KEY),
      tap(() => {
        return this.snackBarService.open(NOTIFICATION.ERROR_UPDATING_FAVOURITES,'X');
      }),
    );
  }, { dispatch: false });

  successAddShortFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.addShortFavorite),
      tap(() => this.snackBarService.open(NOTIFICATION.SUCCESS_ADDING_FAVOURITE,'X')),
    );
  }, { dispatch: false });

  successRemoveShortFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.removeShortFavorite),
      tap(() => this.snackBarService.open(NOTIFICATION.SUCCESS_REMOVING_FAVOURITE,'X')),
    );
  }, { dispatch: false });

  updateDetailedFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.updateDetailedFavorite),
      exhaustMap(({ id, name }) => {
        return this.weatherService.getWeather(id).pipe(
          map((weather: IWeather) =>
            FavoritesActions.updateDetailedFavoriteSuccess({ id, name, weather }),
          ),
          catchError((error: Error) =>
            of(FavoritesActions.updateDetailedFavoriteFailure({ id, name, error: error.message })),
          ),
          minLoadingTime(300),
        );
      })
    );
  });

  successUpdateDetailedFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.updateDetailedFavoriteSuccess),
      tap(({ name }) => {
        return this.snackBarService.open(NOTIFICATION.SUCCESS_UPDATING_WEATHER(name),'X');
      }),
    );
  }, { dispatch: false });

  failureUpdateDetailedFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.updateDetailedFavoriteFailure),
      tap(({ name }) => {
        return this.snackBarService.open(NOTIFICATION.ERROR_UPDATING_WEATHER(name),'X');
      }),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private snackBarService: SnackBarService,
    private favoritesService: FavoritesService,
    private favoritesStore: FavoritesStoreService,
  ) {}
}
