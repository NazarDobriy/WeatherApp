import { Component, Input } from '@angular/core';

import { IForecast } from '../../types/forecast.interface';

@Component({
  selector: 'app-forecast-card',
  templateUrl: './forecast-card.component.html'
})
export class ForecastCardComponent {
  @Input() forecast!: IForecast;

  get averageTemperature(): number {
    return (
      (parseFloat(this.forecast.Temperature.Minimum.Value) +
        parseFloat(this.forecast.Temperature.Maximum.Value)) /
      2
    );
  }
}
