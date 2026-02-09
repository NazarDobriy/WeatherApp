import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { routerNavigatedAction } from "@ngrx/router-store";
import { filter, switchMap, of, map, tap, exhaustMap, first } from "rxjs";
import { Params } from "@angular/router";

import * as FavoritesRouteActions from '@core/store/favorites/routes/actions';
import {
  RemoveFavoritesDialogComponent,
} from "@pages/favorites/components/dialogs/remove-favorites-dialog/remove-favorites-dialog.component";
import { DialogService } from "@core/providers/dialog.service";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { NOTIFICATION } from "@core/constants/notification.constants";
import { SnackBarService } from "@core/providers/snack-bar.service";
import { FavoritesService } from "@core/providers/favorites.service";
import { AppStoreService } from "@app/providers/app-store.service";

@Injectable()
export class FavoritesRouteEffects {
  removeFavoritesRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(routerNavigatedAction),
      exhaustMap(() => {
        return this.appStoreService.queryParams$.pipe(
          filter((params: Params) => params['action'] === 'removeAll'),
        );
      }),
      exhaustMap(() => {
        return this.favoritesStore.detailedFavoritesHasLoaded$.pipe(
          filter(Boolean),
          first(),
        );
      }),
      switchMap(() => {
        return this.favoritesStore.detailedFavoritesLength$.pipe(first());
      }),
      switchMap((amount: number) => {
        if (amount <= 0) {
          return of(FavoritesRouteActions.removeFavoritesEmpty());
        }

        return this.dialogService.open<RemoveFavoritesDialogComponent, undefined, boolean>(
          RemoveFavoritesDialogComponent,
          { panelClass: 'custom-dialog' },
        ).afterClosed().pipe(
            filter((item: boolean | undefined) => typeof item === "boolean"),
            map((item: boolean) => {
              return item
                ? FavoritesRouteActions.removeFavoritesConfirmed()
                : FavoritesRouteActions.removeFavoritesClose();
            }),
          );
      }),
    );
  });

  failureRemoveFavoritesRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesRouteActions.removeFavoritesEmpty),
      tap(() => this.snackBarService.open(NOTIFICATION.ERROR_DIALOG_FAVORITES,'X')),
    );
  }, { dispatch: false });

  successRemoveFavoritesRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FavoritesRouteActions.removeFavoritesConfirmed),
      tap(() => {
        this.favoritesStore.dispatchRemoveFavorites();
        this.snackBarService.open(NOTIFICATION.SUCCESS_DIALOG_FAVORITES,'X');
      }),
    );
  }, { dispatch: false });

  clearRemoveFavoritesRoute$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(
        FavoritesRouteActions.removeFavoritesEmpty,
        FavoritesRouteActions.removeFavoritesConfirmed,
        FavoritesRouteActions.removeFavoritesClose,
      ),
      tap(() => this.favoritesService.clearDialogRouteParams()),
    );
  }, { dispatch: false });

  constructor(
    private actions$: Actions,
    private dialogService: DialogService,
    private snackBarService: SnackBarService,
    private appStoreService: AppStoreService,
    private favoritesService: FavoritesService,
    private favoritesStore: FavoritesStoreService,
  ) {}

}
