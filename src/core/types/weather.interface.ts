import { ITemperature } from '@core/types/temperature.interface';

export interface IWeather {
  WeatherIcon: number;
  WeatherText: string;
  Temperature: {
    Metric: ITemperature;
    Imperial: ITemperature;
  };
}
