import { ITemperatureApi } from '@core/types/temperature-api.interface';

interface IForecastPhaseApi {
  Icon: number;
  IconPhrase: string;
  HasPrecipitation?: boolean;
}

export interface IForecastApi {
  Date: string;
  Temperature: {
    Minimum: ITemperatureApi;
    Maximum: ITemperatureApi;
  };
  Day: IForecastPhaseApi;
  Night: IForecastPhaseApi;
}
