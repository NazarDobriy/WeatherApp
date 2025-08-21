import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/abstract/temperature-unit';

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html',
  standalone: true,
  imports: [CardComponent, TemperatureConverterPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteCartComponent extends TemperatureUnit {
  readonly favorite = input.required<IFavoriteDetailedInfo>();

  readonly temperature = computed<number>(() => parseFloat(this.favorite().Temperature.Metric.Value));

  constructor() {
    super();
  }

}
