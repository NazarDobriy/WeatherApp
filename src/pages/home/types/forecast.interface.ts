import { ITemperature } from './temperature.interface';

export interface IForecast {
  Date: string;
  Temperature: {
    Minimum: ITemperature;
    Maximum: ITemperature;
  };
}
