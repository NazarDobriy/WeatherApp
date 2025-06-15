import { Injectable } from '@angular/core';

import { IForecast } from '@core/types/forecast.interface';

@Injectable()
export class ForecastCardService {
  getAverageTemperature(forecast: IForecast): number {
    return (parseFloat(forecast.Temperature.Minimum.Value) + parseFloat(forecast.Temperature.Maximum.Value)) / 2;
  }
}
