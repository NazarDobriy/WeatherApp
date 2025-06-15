import { ITemperature } from '@core/types/temperature.interface';

export interface IForecast {
  Date: string;
  Temperature: {
    Minimum: ITemperature;
    Maximum: ITemperature;
  };
}
