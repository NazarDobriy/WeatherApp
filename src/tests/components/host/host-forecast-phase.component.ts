import { Component } from '@angular/core';

import { ForecastPhaseComponent } from '@pages/home/components/forecast-card/components/forecast-phase/forecast-phase.component';
import { IForecastPhase } from '@core/types/forecast.interface';

@Component({
  imports: [ForecastPhaseComponent],
  template: `<app-forecast-phase phase="Day" [forecastPhase]="forecastPhase"></app-forecast-phase>`,
})
export class HostForecastPhaseComponent {
  readonly forecastPhase: IForecastPhase = {
    Icon: 14,
    IconPhrase: 'Sunny',
  };
}
