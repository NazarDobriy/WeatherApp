import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { routerNavigatedAction } from '@ngrx/router-store';
import { filter, switchMap, of, map, tap, exhaustMap, first } from 'rxjs';
import { Params } from '@angular/router';

import * as FavoritesActions from '@core/store/favorites/actions';
import * as FavoritesRouteActions from '@core/store/favorites/routes/actions';
import { DialogService } from '@core/providers/dialog.service';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { NOTIFICATION } from '@core/constants/notification.constants';
import { SnackBarService } from '@core/providers/snack-bar.service';
import { FavoritesService } from '@core/providers/favorites.service';
import { CrossTabFavoritesService } from '@core/providers/cross-tab-favorites.service';
import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { RemoveFavoriteDialogComponent } from '@pages/favorites/components/favorite-cart/dialogs/remove-favorite-dialog/remove-favorite-dialog.component';
import { RemoveFavoritesDialogComponent } from '@pages/favorites/components/dialogs/remove-favorites-dialog/remove-favorites-dialog.component';

@Injectable()
export class FavoritesRouteEffects {
  removeFavoritesRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      filter(({ payload }) => {
        return payload.routerState.root.queryParams['action'] === 'removeAll';
      }),
      exhaustMap(() => {
        return this.favoritesStore.detailedFavoritesHasLoaded$.pipe(filter(Boolean), first());
      }),
      switchMap(() => {
        return this.favoritesStore.detailedFavoritesLength$.pipe(first());
      }),
      switchMap((amount: number) => {
        if (amount <= 0) {
          return of(FavoritesRouteActions.removeFavoritesEmpty());
        }

        return this.dialogService
          .open<RemoveFavoritesDialogComponent, undefined, boolean>(RemoveFavoritesDialogComponent, {
            panelClass: 'custom-dialog',
          })
          .afterClosed()
          .pipe(
            map((item: boolean | undefined) => {
              if (typeof item !== 'boolean') {
                return FavoritesRouteActions.removeFavoritesClose();
              }

              return item
                ? FavoritesRouteActions.removeFavoritesConfirmed()
                : FavoritesRouteActions.removeFavoritesClose();
            }),
          );
      }),
    );
  });

  failureRemoveFavoritesRoute$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FavoritesRouteActions.removeFavoritesEmpty),
        tap(() => this.snackBarService.open(NOTIFICATION.ERROR_DIALOG_FAVORITES, 'X')),
      );
    },
    { dispatch: false },
  );

  successRemoveFavoritesRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesRouteActions.removeFavoritesConfirmed),
      map(() => FavoritesActions.removeFavorites()),
    );
  });

  successRemoveFavoritesTabSharing$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FavoritesRouteActions.removeFavoritesConfirmed),
        tap(() => this.crossTabFavoritesService.send({ type: 'removeAll' })),
      );
    },
    { dispatch: false },
  );

  showRemoveFavoritesSnackbar$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FavoritesRouteActions.removeFavoritesConfirmed),
        tap(() => {
          this.snackBarService.open(NOTIFICATION.SUCCESS_DIALOG_FAVORITES, 'X');
        }),
      );
    },
    { dispatch: false },
  );

  clearRemoveFavoritesRoute$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          FavoritesRouteActions.removeFavoritesEmpty,
          FavoritesRouteActions.removeFavoritesConfirmed,
          FavoritesRouteActions.removeFavoritesClose,
        ),
        tap(() => this.favoritesService.clearDialogRouteParams()),
      );
    },
    { dispatch: false },
  );

  removeFavoriteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      map(({ payload }) => payload.routerState.root.queryParams),
      filter((queryParams: Params): queryParams is Params & { id: string } => {
        return (
          queryParams['action'] === 'remove' && typeof queryParams['id'] === 'string' && !!queryParams['id']
        );
      }),
      map((queryParams: Params & { id: string }) => queryParams.id),
      exhaustMap((id: string) => {
        return this.favoritesStore.detailedFavoritesHasLoaded$.pipe(
          filter(Boolean),
          first(),
          map(() => id),
        );
      }),
      switchMap((id: string) => {
        return this.favoritesStore.getDetailedFavoriteById(id).pipe(
          map((favorite: IFavoriteDetailedInfo | undefined): [string, IFavoriteDetailedInfo | undefined] => {
            return [id, favorite];
          }),
          first(),
        );
      }),
      switchMap(([id, favorite]) => {
        if (!favorite) {
          return of(FavoritesRouteActions.removeFavoriteEmpty({ id }));
        }

        return this.dialogService
          .open<RemoveFavoriteDialogComponent, { name: string }, boolean>(RemoveFavoriteDialogComponent, {
            panelClass: 'custom-dialog',
            data: {
              name: favorite.name,
            },
          })
          .afterClosed()
          .pipe(
            map((response: boolean | undefined) => {
              if (typeof response !== 'boolean') {
                return FavoritesRouteActions.removeFavoriteClose({ name: favorite.name });
              }

              return response
                ? FavoritesRouteActions.removeFavoriteConfirmed({ id: favorite.id, name: favorite.name })
                : FavoritesRouteActions.removeFavoriteClose({ name: favorite.name });
            }),
          );
      }),
    );
  });

  failureRemoveFavoriteRoute$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(FavoritesRouteActions.removeFavoriteEmpty),
        tap(({ id }) => this.snackBarService.open(NOTIFICATION.ERROR_DIALOG_FAVORITE(id), 'X')),
      );
    },
    { dispatch: false },
  );

  clearRemoveFavoriteRoute$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          FavoritesRouteActions.removeFavoriteEmpty,
          FavoritesRouteActions.removeFavoriteConfirmed,
          FavoritesRouteActions.removeFavoriteClose,
        ),
        tap(() => this.favoritesService.clearDialogRouteParams()),
      );
    },
    { dispatch: false },
  );

  successRemoveFavoriteRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesRouteActions.removeFavoriteConfirmed),
      map(({ id, name }) => FavoritesActions.removeShortFavorite({ id, name })),
    );
  });

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private favoritesService: FavoritesService,
    private favoritesStore: FavoritesStoreService,
    private crossTabFavoritesService: CrossTabFavoritesService,
  ) {}
}
