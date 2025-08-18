import { ChangeDetectionStrategy, Component, input, OnChanges, signal, SimpleChanges } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IForecast } from '@core/types/forecast.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { ForecastCardService } from '@pages/home/components/forecast-card/providers/forecast-card.service';
import { TemperatureUnit } from '@shared/abstract/temperature-unit';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  standalone: true,
  imports: [DatePipe, CardComponent, TemperatureConverterPipe],
  providers: [ForecastCardService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastCardComponent extends TemperatureUnit implements OnChanges {
  forecast = input.required<IForecast>();

  averageTemperature = signal<number | null>(null);

  constructor(private forecastCardService: ForecastCardService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecast']?.currentValue) {
      this.averageTemperature.set(this.forecastCardService.getAverageTemperature(changes['forecast']?.currentValue));
    }
  }

}
