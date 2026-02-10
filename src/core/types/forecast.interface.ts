import { ITemperature } from '@core/types/temperature.interface';

export interface IForecastPhase {
  Icon: number;
  IconPhrase: string;
}

export interface IForecast {
  Date: string;
  Temperature: {
    Minimum: ITemperature;
    Maximum: ITemperature;
  };
  Day: IForecastPhase;
  Night: IForecastPhase;
}
