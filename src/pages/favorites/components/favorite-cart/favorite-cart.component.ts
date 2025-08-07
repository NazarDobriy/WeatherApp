import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

import { IFavoriteDetailedInfo } from '@core/types/favorite.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { TemperatureUnit } from '@shared/abstract/temperature-unit';

@Component({
  selector: 'app-favorite-cart',
  templateUrl: './favorite-cart.component.html',
  standalone: true,
  imports: [CardComponent, TemperatureConverterPipe],
})
export class FavoriteCartComponent extends TemperatureUnit implements OnChanges {
  @Input() favorite: IFavoriteDetailedInfo | null = null;

  temperature: number | null = null;

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favorite']?.currentValue) {
      this.temperature = parseFloat(changes['favorite'].currentValue.Temperature.Metric.Value);
    }
  }

}
