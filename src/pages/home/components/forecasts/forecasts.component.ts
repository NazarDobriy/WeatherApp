import { Component, Input } from '@angular/core';

import { IForecast } from '../../types/forecast.interface';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html'
})
export class ForecastsComponent {
  @Input() forecasts: IForecast[] = [];
}
