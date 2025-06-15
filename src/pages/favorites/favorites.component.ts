import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';
import { FavoriteCartComponent } from '@pages/favorites/components/favorite-cart/favorite-cart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  standalone: true,
  imports: [NgFor, AsyncPipe, FavoriteCartComponent, NgIf, MatProgressSpinnerModule]
})
export class FavoritesComponent implements OnInit {
  readonly shortFavorites$ = this.favoritesStore.shortFavorites$;
  readonly detailedFavorites$ = this.favoritesStore.detailedFavorites$;
  readonly isLoadingDetailedFavorites$ = this.favoritesStore.isLoadingDetailedFavorites$;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private favoritesStore: FavoritesStoreService,
    private locationStore: LocationStoreService
  ) {}

  ngOnInit(): void {
    this.shortFavorites$.pipe(
      takeUntil(this.destroy$),
    ).subscribe({
      next: (shortFavorites: IFavoriteShortInfo[]) => {
        this.favoritesStore.dispatchDetailedFavorites(shortFavorites);
      },
    });
  }

  selectFavorite(detailedFavorite: IFavoriteDetailedInfo): void {
    this.locationStore.dispatchLocationChange({
      Key: detailedFavorite.id,
      LocalizedName: detailedFavorite.name,
    });
    this.router.navigateByUrl('/');
  }
}
