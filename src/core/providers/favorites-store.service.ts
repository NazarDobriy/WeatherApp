import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FavoritesActions from '@core/store/favorites/actions';
import * as FavoritesSelectors from '@core/store/favorites/selectors';
import { IFavoriteShortInfo } from '@core/types/favorite.interface';
import { IFavoritesState } from '@core/store/favorites/state';

@Injectable()
export class FavoritesStoreService {
  readonly shortFavorites$ = this.store.select(FavoritesSelectors.selectShortFavorites);
  readonly detailedFavorites$ = this.store.select(FavoritesSelectors.selectDetailedFavorites);
  readonly detailedFavoritesFailure$ = this.store.select(FavoritesSelectors.selectFailureDetailedFavorites);
  readonly isLoadingDetailedFavorites$ = this.store.select(FavoritesSelectors.selectIsLoadingDetailedFavorites);

  constructor(private store: Store<IFavoritesState>) {}

  dispatchAddShortFavorite(shortFavorite: IFavoriteShortInfo): void {
    this.store.dispatch(FavoritesActions.addShortFavorite({ shortFavorite }));
  }

  dispatchRemoveShortFavorite(id: string): void {
    this.store.dispatch(FavoritesActions.removeShortFavorite({ id }));
  }

  dispatchSetShortFavorites(shortFavorites: IFavoriteShortInfo[]): void {
    this.store.dispatch(FavoritesActions.setShortFavorites({ shortFavorites }));
  }

  dispatchDetailedFavorites(shortFavorites: IFavoriteShortInfo[]): void {
    this.store.dispatch(FavoritesActions.getDetailedFavorites({ shortFavorites }));
  }
}
