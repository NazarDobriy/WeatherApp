import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import * as FavoritesActions from '@core/store/favorites/actions';
import { FavoritesService } from '@core/providers/favorites.service';
import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';

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

  constructor(
    private actions$: Actions,
    private favoritesService: FavoritesService,
  ) {}
}
