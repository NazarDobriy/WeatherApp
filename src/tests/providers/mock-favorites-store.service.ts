import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { IFavoriteShortInfo } from '@core/types/favorite.interface';
import { FavoritesLoadingType } from '@core/types/favorites-loading.type';

@Injectable()
export class MockFavoritesStoreService {
  readonly detailedFavoritesLength$ = of(4);

  dispatchSetShortFavorites(shortFavorites: IFavoriteShortInfo[]): void {}

  dispatchDetailedFavorites(loadingKey: string): void {}

  getDetailedFavoriteIsLoading(id: string): Observable<boolean> {
    return of(false);
  }

  getLoadingSelectByKey(key: FavoritesLoadingType): Observable<boolean> {
    return of(true);
  }
}
