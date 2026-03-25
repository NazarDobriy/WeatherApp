import { IForecastApi } from '@core/types/forecast-api.interface';
import { IForecast } from '@core/types/forecast.interface';

function forecastMapper(forecast: IForecastApi): IForecast {
  return {
    date: forecast.Date,
    temperature: {
      minimum: {
        value: forecast.Temperature.Minimum.Value,
        unit: forecast.Temperature.Minimum.Unit,
      },
      maximum: {
        value: forecast.Temperature.Maximum.Value,
        unit: forecast.Temperature.Maximum.Unit,
      },
    },
    day: {
      icon: forecast.Day.Icon,
      iconPhrase: forecast.Day.IconPhrase,
      hasPrecipitation: forecast.Day.HasPrecipitation,
    },
    night: {
      icon: forecast.Night.Icon,
      iconPhrase: forecast.Night.IconPhrase,
      hasPrecipitation: forecast.Night.HasPrecipitation,
    },
  };
}

export function forecastsMapper(forecasts: IForecastApi[]): IForecast[] {
  return forecasts.map((forecast: IForecastApi) => forecastMapper(forecast));
}
