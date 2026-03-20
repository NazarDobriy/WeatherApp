import { Component } from '@angular/core';

import { ForecastsComponent } from '@pages/home/components/forecasts/forecasts.component';
import { MOCK_FORECAST } from '@tests/constants/test.constants';

@Component({
  imports: [ForecastsComponent],
  template: `<app-forecasts [forecasts]="forecasts"></app-forecasts>`,
})
export class HostForecastsComponent {
  readonly forecasts = [MOCK_FORECAST];
}
