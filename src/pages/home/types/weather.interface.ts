import { ITemperature } from './temperature.interface';

export interface IWeather {
  WeatherText: string;
  Temperature: {
    Metric: ITemperature;
    Imperial: ITemperature;
  };
}
