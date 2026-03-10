import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IForecast } from '@core/types/forecast.interface';
import { ForecastCardComponent } from '@pages/home/components/forecast-card/forecast-card.component';

@Component({
  selector: 'app-forecasts',
  imports: [ForecastCardComponent],
  templateUrl: './forecasts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastsComponent {
  readonly forecasts = input.required<IForecast[]>();
}
