import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, NgFor } from '@angular/common';

import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { IFavorite } from '@core/types/favorite.interface';
import { FavoriteCartComponent } from '@pages/favorites/components/favorite-cart/favorite-cart.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  standalone: true,
  imports: [NgFor, AsyncPipe, FavoriteCartComponent],
})
export class FavoritesComponent {
  readonly favorites$ = this.favoritesStore.favorites$;

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
