import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MatTooltip } from "@angular/material/tooltip";

import { IForecast } from '@core/types/forecast.interface';
import { CardComponent } from '@shared/components/card/card.component';
import { TemperatureConverterPipe } from '@shared/pipes/temperature-converter.pipe';
import { ForecastCardService } from '@pages/home/components/forecast-card/providers/forecast-card.service';
import { TemperatureUnit } from '@shared/helpers/temperature-unit.helper';
import {
  ForecastPhaseComponent
} from "@pages/home/components/forecast-card/components/forecast-phase/forecast-phase.component";

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html',
  imports: [
    DatePipe,
    MatTooltip,
    CardComponent,
    TemperatureConverterPipe,
    ForecastPhaseComponent,
  ],
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
