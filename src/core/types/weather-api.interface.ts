import { ITemperature } from '@core/types/temperature.interface';

export interface IWeatherApi {
  WeatherIcon: number;
  WeatherText: string;
  Temperature: {
    Metric: ITemperature;
    Imperial: ITemperature;
  };
}
