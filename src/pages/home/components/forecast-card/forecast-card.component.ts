import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';

import { IForecast } from '@core/types/forecast.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { ForecastCardService } from '@pages/home/components/forecast-card/providers/forecast-card.service';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  imports: [DatePipe, CardComponent, TemperatureConverterPipe],
  providers: [ForecastCardService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastCardComponent extends TemperatureUnit {
  readonly forecast = input.required<IForecast>();

  readonly averageTemperature = computed<number>(() => {
    return this.forecastCardService.getAverageTemperature(this.forecast());
  });

  constructor(private forecastCardService: ForecastCardService) {
    super();
  }

}
