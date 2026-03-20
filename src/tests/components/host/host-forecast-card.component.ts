import { Component } from '@angular/core';

import { ForecastCardComponent } from '@pages/home/components/forecast-card/forecast-card.component';
import { MOCK_FORECAST } from '@tests/constants/test.constants';

@Component({
  imports: [ForecastCardComponent],
  template: `<app-forecast-card [forecast]="forecast"></app-forecast-card>`,
})
export class HostForecastCardComponent {
  readonly forecast = MOCK_FORECAST;
}
