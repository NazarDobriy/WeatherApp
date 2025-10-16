import { ChangeDetectionStrategy, Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';
import { FavoriteCartComponent } from '@pages/favorites/components/favorite-cart/favorite-cart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  imports: [AsyncPipe, FavoriteCartComponent, MatProgressSpinnerModule, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  readonly shortFavorites$ = this.favoritesStore.shortFavorites$;
  readonly detailedFavorites$ = this.favoritesStore.detailedFavorites$;
  readonly isLoadingDetailedFavorites$ = this.favoritesStore.isLoadingDetailedFavorites$;

  constructor(
    private router: Router,
    private destroyRef: DestroyRef,
    private favoritesStore: FavoritesStoreService,
    private locationStore: LocationStoreService,
  ) {}

  ngOnInit(): void {
    this.shortFavorites$.pipe(
      takeUntilDestroyed(this.destroyRef),
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
