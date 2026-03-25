import { ChangeDetectionStrategy, Component, computed, input, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { of } from 'rxjs';

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';
import { ButtonComponent } from '@shared/components/button/button.component';
import { ButtonVariant, ButtonWidth } from '@shared/components/button/types/button.enum';
import { FavoritesStoreService } from '@core/providers/favorites-store.service';
import { CARD } from '@shared/components/card/types/card.enum';

@Component({
  selector: 'app-favorite-cart',
  imports: [
    CardComponent,
    TemperatureConverterPipe,
    NgOptimizedImage,
    ButtonComponent,
    AsyncPipe,
    MatIcon,
    MatTooltip,
  ],
  templateUrl: './favorite-cart.component.html',
  styleUrl: './favorite-cart.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCartComponent extends TemperatureUnit implements OnInit {
  readonly favorite = input.required<IFavoriteDetailedInfo>();

  isLoading$ = of<boolean>(false);
  readonly CARD = CARD;
  readonly buttonVariant = ButtonVariant;
  readonly buttonWidth = ButtonWidth;
  readonly temperature = computed<number>(() => this.favorite().temperature.metric.Value);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private favoritesStore: FavoritesStoreService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.favoritesStore.getDetailedFavoriteIsLoading(this.favorite().id);
  }

  refreshWeather(): void {
    this.favoritesStore.dispatchUpdateDetailedFavorite(this.favorite().id, this.favorite().name);
  }

  removeFromFavorites(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { id: this.favorite().id, action: 'remove' },
      queryParamsHandling: 'merge',
    });
  }
}
