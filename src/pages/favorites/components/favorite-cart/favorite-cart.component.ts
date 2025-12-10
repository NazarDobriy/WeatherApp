import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import {NgOptimizedImage} from "@angular/common";

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html',
  imports: [CardComponent, TemperatureConverterPipe, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCartComponent extends TemperatureUnit {
  readonly favorite = input.required<IFavoriteDetailedInfo>();

  readonly temperature = computed<number>(() => parseFloat(this.favorite().Temperature.Metric.Value));

  constructor() {
    super();
  }

}
