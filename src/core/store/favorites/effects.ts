import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as FavoritesActions from '@core/store/favorites/actions';
import { FavoritesService } from '@core/providers/favorites.service';
import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { NOTIFICATION } from '@core/constants/notification.constants';
import { WeatherService } from "@core/providers/weather.service";
import { IWeather } from "@core/types/weather.interface";

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

  updateDetailedFavorite$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.updateDetailedFavorite),
      switchMap(({ id }) => {
        return this.weatherService.getWeather(id).pipe(
          map((weather: IWeather) =>
            FavoritesActions.updateDetailedFavoriteSuccess({ id, weather }),
          ),
          catchError((error: Error) =>
            of(FavoritesActions.updateDetailedFavoriteFailure({ id, error: error.message })),
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

  constructor(
    private actions$: Actions,
    private weatherService: WeatherService,
    private snackBarService: SnackBarService,
    private favoritesService: FavoritesService,
  ) {}
}
