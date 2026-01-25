import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap, tap } from 'rxjs';

import * as FavoritesActions from '@core/store/favorites/actions';
import { FavoritesService } from '@core/providers/favorites.service';
import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { NOTIFICATION } from '@core/constants/notification.constants';
import { WeatherService } from "@core/providers/weather.service";
import { IWeather } from "@core/types/weather.interface";
import { minLoadingTime } from "@utils/index";

@Injectable()
export class FavoritesEffects {
  getDetailedFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.getDetailedFavorites),
      switchMap(({ shortFavorites }) => {
        return this.favoritesService.getDetailedFavorites(shortFavorites).pipe(
          map((detailedFavorites: IFavoriteDetailedInfo[]) =>
            FavoritesActions.getDetailedFavoritesSuccess({ detailedFavorites }),
          ),
          catchError((error: Error) =>
            of(FavoritesActions.getDetailedFavoritesFailure({ error: error.message })),
          )
        );
      })
    );
  });

  failureDetailedFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.getDetailedFavoritesFailure),
      tap(() => this.snackBarService.open(NOTIFICATION.ERROR_GETTING_FAVOURITES, 'X')),
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
  ) {}
}
