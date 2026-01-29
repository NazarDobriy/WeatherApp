import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from "rxjs";

import * as FavoritesActions from '@core/store/favorites/actions';
import * as FavoritesSelectors from '@core/store/favorites/selectors';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';
import { IFavoritesState } from '@core/store/favorites/state';
import { FavoritesLoadingType } from "@core/types/favorites-loading.type";

@Injectable()
export class FavoritesStoreService {
  readonly shortFavorites$ = this.store.select(FavoritesSelectors.selectShortFavorites);
  readonly detailedFavorites$ = this.store.select(FavoritesSelectors.selectDetailedFavorites);
  readonly detailedFavoritesFailure$ = this.store.select(FavoritesSelectors.selectFailureDetailedFavorites);

  constructor(private store: Store<IFavoritesState>) {}

  dispatchAddShortFavorite(shortFavorite: IFavoriteShortInfo): void {
    this.store.dispatch(FavoritesActions.addShortFavorite({ shortFavorite }));
  }

  dispatchRemoveShortFavorite(id: string, name: string): void {
    this.store.dispatch(FavoritesActions.removeShortFavorite({ id, name }));
  }

  dispatchSetShortFavorites(shortFavorites: IFavoriteShortInfo[]): void {
    this.store.dispatch(FavoritesActions.setShortFavorites({ shortFavorites }));
  }

  dispatchDetailedFavorites(loadingKey: string): void {
    this.store.dispatch(FavoritesActions.getDetailedFavorites({ loadingKey }));
  }

  dispatchUpdateDetailedFavorite(id: string, name: string): void {
    this.store.dispatch(FavoritesActions.updateDetailedFavorite({ id, name }));
  }

  getDetailedFavoriteIsLoading(id: string): Observable<boolean> {
    return this.detailedFavorites$.pipe(
      map((detailedFavorites: IFavoriteDetailedInfo[]) => {
        return detailedFavorites.find((item: IFavoriteDetailedInfo) => item.id === id)?.isLoading ?? false;
      }),
    );
  }

  getLoadingSelectByKey(key: FavoritesLoadingType): Observable<boolean> {
    return this.store.select(FavoritesSelectors.selectLoadingDetailedFavorites(key));
  }
}
