import { ChangeDetectionStrategy, Component, computed, input, OnInit } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { MatTooltip } from "@angular/material/tooltip";
import { MatIcon } from "@angular/material/icon";
import { of } from "rxjs";

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';
import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonVariant, ButtonWidth } from "@shared/components/button/types/button.enum";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";
import { CARD } from "@shared/components/card/types/card.enum";

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html',
  styleUrls: ['./favorite-cart.component.scss'],
  imports: [
    CardComponent,
    TemperatureConverterPipe,
    NgOptimizedImage,
    ButtonComponent,
    AsyncPipe,
    MatIcon,
    MatTooltip,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCartComponent extends TemperatureUnit implements OnInit {
  readonly favorite = input.required<IFavoriteDetailedInfo>();

  isLoading$ = of<boolean>(false);
  readonly CARD = CARD;
  readonly buttonVariant = ButtonVariant;
  readonly buttonWidth = ButtonWidth;
  readonly temperature = computed<number>(() => parseFloat(this.favorite().Temperature.Metric.Value));

  constructor(private favoritesStore: FavoritesStoreService) {
    super();
  }

  ngOnInit(): void {
    this.isLoading$ = this.favoritesStore.getDetailedFavoriteIsLoading(this.favorite().id);
  }

  refreshWeather(): void {
    this.favoritesStore.dispatchUpdateDetailedFavorite(this.favorite().id, this.favorite().name);
  }

  removeFromFavorites(): void {
    this.favoritesStore.dispatchRemoveShortFavorite(this.favorite().id, this.favorite().name);
  }

}
