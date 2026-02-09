import { Injectable } from '@angular/core';
import { Store } from "@ngrx/store";

import * as FavoritesRouteActions from '@core/store/favorites/routes/actions';
import { IFavoritesState } from "@core/store/favorites/state";

@Injectable({
  providedIn: 'root',
})
export class FavoritesRouteStoreService {

  constructor(private store: Store<IFavoritesState>) {}

  dispatchRemoveFavoritesEmpty(): void {
    this.store.dispatch(FavoritesRouteActions.removeFavoritesEmpty());
  }

}
