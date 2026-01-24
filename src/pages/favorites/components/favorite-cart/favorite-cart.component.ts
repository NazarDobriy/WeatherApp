import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { AsyncPipe, NgOptimizedImage } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { Observable } from "rxjs";

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';
import { ButtonComponent } from "@shared/components/button/button.component";
import { ButtonEnum, ButtonWidthEnum } from "@shared/components/button/types/button.enum";
import { FavoritesStoreService } from "@core/providers/favorites-store.service";

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
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCartComponent extends TemperatureUnit {
  readonly favorite = input.required<IFavoriteDetailedInfo>();

  readonly buttonType = ButtonEnum;
  readonly buttonWidth = ButtonWidthEnum;
  readonly temperature = computed<number>(() => parseFloat(this.favorite().Temperature.Metric.Value));
  readonly isLoading$ = computed<Observable<boolean>>(() => {
    return this.favoritesStore.getDetailedFavoriteIsLoading(this.favorite().id);
  });

  constructor(private favoritesStore: FavoritesStoreService) {
    super();
  }

  refreshWeather(): void {
    this.favoritesStore.dispatchUpdateDetailedFavoriteById(this.favorite().id);
  }

}
