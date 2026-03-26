import { ITemperature } from '@core/types/temperature.interface';

export interface IWeather {
  weatherIcon: number;
  weatherText: string;
  temperature: {
    metric: ITemperature;
    imperial: ITemperature;
  };
}
