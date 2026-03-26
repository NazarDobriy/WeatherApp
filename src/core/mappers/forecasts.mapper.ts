import { IForecastApi } from '@core/types/forecast-api.interface';
import { IForecast } from '@core/types/forecast.interface';
import { forecastMapper } from '@core/mappers/forecast.mapper';

export function forecastsMapper(forecasts: IForecastApi[]): IForecast[] {
  return forecasts.map((forecast: IForecastApi) => forecastMapper(forecast));
}
