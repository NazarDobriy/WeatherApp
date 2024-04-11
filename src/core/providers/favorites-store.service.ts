import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as FavoritesActions from '../store/favorites/actions';
import * as FavoritesSelectors from '../store/favorites/selectors';
import { IFavorite } from '../types/favorite.interface';

@Injectable()
export class FavoritesStoreService {
  favorites$ = this.store.select(FavoritesSelectors.selectFavorites);

  constructor(private store: Store) {}

  dispatchFavorites(): void {
    this.store.dispatch(FavoritesActions.getFavorites());
  }

  dispatchFavoriteAdd(favorite: IFavorite): void {
    this.store.dispatch(FavoritesActions.addFavorite({ favorite }));
  }

  dispatchFavoriteRemove(id: string): void {
    this.store.dispatch(FavoritesActions.removeFavorite({ id }));
  }
}