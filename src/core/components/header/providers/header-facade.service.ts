import { Injectable } from '@angular/core';
import { combineLatest, map, shareReplay } from "rxjs";

import { AppStoreService } from "@app/providers/app-store.service";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";

@Injectable()
export class HeaderFacadeService {
  readonly isHideBlock$ = combineLatest([
    this.appStoreService.isRoute('/home'),
    this.favoritesStore.detailedFavorites$,
  ]).pipe(
    map(([isHomeRoute, favorites]) => {
      return !isHomeRoute && favorites.length !== 0;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  constructor(
    private appStoreService: AppStoreService,
    private favoritesStore: FavoritesStoreService,
  ) {}

}
