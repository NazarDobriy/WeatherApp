import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';

import * as FavoritesActions from '@core/store/favorites/actions';
import { FavoritesService } from '@core/providers/favorites.service';
import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { Notification } from '@core/constants/notification.constants';

@Injectable()
export class FavoritesEffects {
  getDetailedFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.getDetailedFavorites),
      switchMap((action) => {
        return this.favoritesService.getDetailedFavorites(action.shortFavorites).pipe(
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
      tap(() => this.snackBarService.open(Notification.ERROR_GETTING_FAVOURITES, 'X')),
    );
  }, { dispatch: false });

  successAddShortFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.addShortFavorite),
      tap(() => this.snackBarService.open(Notification.SUCCESS_ADDING_FAVOURITE,'X')),
    );
  }, { dispatch: false });

  successRemoveShortFavorites$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesActions.removeShortFavorite),
      tap(() => this.snackBarService.open(Notification.SUCCESS_REMOVING_FAVOURITE,'X')),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private snackBarService: SnackBarService,
    private favoritesService: FavoritesService,
  ) {}
}
