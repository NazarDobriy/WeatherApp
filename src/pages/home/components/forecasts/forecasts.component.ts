import { Component, Input } from '@angular/core';

import { IForecast } from '@core/types/forecast.interface';
import { ForecastCardComponent } from '@pages/home/components/forecast-card/forecast-card.component';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  standalone: true,
  imports: [ForecastCardComponent],
})
export class ForecastsComponent {
  @Input() forecasts: IForecast[] = [];
}
