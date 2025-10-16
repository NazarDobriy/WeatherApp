import { ChangeDetectionStrategy, Component, input } from '@angular/core';

import { IForecast } from '@core/types/forecast.interface';
import { ForecastCardComponent } from '@pages/home/components/forecast-card/forecast-card.component';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  imports: [ForecastCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForecastsComponent {
  forecasts = input.required<IForecast[]>();
}
