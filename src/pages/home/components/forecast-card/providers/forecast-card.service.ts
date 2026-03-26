import { Injectable } from '@angular/core';

import { IForecast } from '@core/types/forecast.interface';

@Injectable()
export class ForecastCardService {
  getAverageTemperature({ temperature }: IForecast): number {
    return (temperature.minimum.value + temperature.maximum.value) / 2;
  }
}
