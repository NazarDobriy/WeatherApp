import { Component, Input } from '@angular/core';
import { NgFor } from '@angular/common';

import { IForecast } from '@pages/home/types/forecast.interface';
import { ForecastCardComponent } from '@pages/home/components/forecast-card/forecast-card.component';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  standalone: true,
  imports: [NgFor, ForecastCardComponent],
})
export class ForecastsComponent {
  @Input() forecasts: IForecast[] = [];
}
