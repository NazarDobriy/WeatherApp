import { ITemperature } from '@core/types/temperature.interface';

export interface IWeather {
  WeatherText: string;
  Temperature: {
    Metric: ITemperature;
    Imperial: ITemperature;
  };
}
