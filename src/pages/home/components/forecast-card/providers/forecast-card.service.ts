import { Injectable } from '@angular/core';

import { IForecast } from '@core/types/forecast.interface';

@Injectable()
export class ForecastCardService {
  getAverageTemperature(forecast: IForecast): number {
    return (forecast.Temperature.Minimum.Value + forecast.Temperature.Maximum.Value) / 2;
  }
}
