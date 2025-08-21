import { ChangeDetectionStrategy, Component, input, OnChanges, signal, SimpleChanges } from '@angular/core';

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
export class FavoriteCartComponent extends TemperatureUnit implements OnChanges {
  favorite = input.required<IFavoriteDetailedInfo>();

  temperature = signal<number | null>(null);

  constructor() {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['favorite']?.currentValue) {
      this.temperature.set(parseFloat(changes['favorite'].currentValue.Temperature.Metric.Value));
    }
  }

}
