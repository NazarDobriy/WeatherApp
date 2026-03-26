import { ITemperatureApi } from '@core/types/temperature-api.interface';

export interface IWeatherApi {
  WeatherIcon: number;
  WeatherText: string;
  Temperature: {
    Metric: ITemperatureApi;
    Imperial: ITemperatureApi;
  };
}
