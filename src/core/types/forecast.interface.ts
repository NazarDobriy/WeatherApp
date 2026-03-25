import { ITemperature } from '@core/types/temperature.interface';

export interface IForecastPhase {
  icon: number;
  iconPhrase: string;
  hasPrecipitation?: boolean;
}

export interface IForecast {
  date: string;
  temperature: {
    minimum: ITemperature;
    maximum: ITemperature;
  };
  day: IForecastPhase;
  night: IForecastPhase;
}
