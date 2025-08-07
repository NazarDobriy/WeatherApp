import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
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
})
export class ForecastCardComponent extends TemperatureUnit implements OnChanges {
  @Input() forecast: IForecast | null = null;

  averageTemperature: number | null = null;

  constructor(private forecastCardService: ForecastCardService) {
    super();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['forecast']?.currentValue) {
      this.averageTemperature = this.forecastCardService.getAverageTemperature(changes['forecast']?.currentValue);
    }
  }

}
