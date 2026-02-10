import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AsyncPipe } from '@angular/common';

import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { LocationStoreService } from '@core/providers/location-store.service';
import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { FavoriteCartComponent } from '@pages/favorites/components/favorite-cart/favorite-cart.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PAGE_KEY } from "@core/constants/loading.constants";

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
  imports: [
    AsyncPipe,
    RouterLink,
    FavoriteCartComponent,
    MatProgressSpinnerModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesComponent implements OnInit {
  readonly detailedFavorites$ = this.favoritesStore.detailedFavorites$;
  readonly isLoadingDetailedFavorites$ = this.favoritesStore.getLoadingSelectByKey(PAGE_KEY);

  constructor(
    private router: Router,
    private titleService: Title,
    private favoritesStore: FavoritesStoreService,
    private locationStore: LocationStoreService,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Favorites | Weather');
    this.favoritesStore.dispatchDetailedFavorites(PAGE_KEY);
  }

  selectFavorite(detailedFavorite: IFavoriteDetailedInfo): void {
    this.locationStore.dispatchLocationChange({
      Key: detailedFavorite.id,
      LocalizedName: detailedFavorite.name,
    });
    this.router.navigateByUrl('/');
  }

}
