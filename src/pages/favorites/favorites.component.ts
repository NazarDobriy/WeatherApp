import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { IFavorite } from '@core/types/favorite.interface';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html'
})
export class FavoritesComponent {
  favorites$ = this.favoritesStore.favorites$;

  constructor(
    private router: Router,
    private favoritesStore: FavoritesStoreService,
    private locationStore: LocationStoreService
  ) {}

  selectFavorite(favorite: IFavorite): void {
    this.locationStore.dispatchLocationChange({
      Key: favorite.id,
      LocalizedName: favorite.name
    });
    this.router.navigateByUrl('/');
  }
}
