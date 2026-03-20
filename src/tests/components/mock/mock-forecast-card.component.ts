import { Component, input } from '@angular/core';

import { IForecast } from '@core/types/forecast.interface';

@Component({
  selector: 'app-forecast-card',
  template: '',
})
export class MockForecastCardComponent {
  readonly forecast = input.required<IForecast>();
}
