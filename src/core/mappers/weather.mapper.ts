import { IWeatherApi } from '@core/types/weather-api.interface';
import { IWeather } from '@core/types/weather.interface';

export function weatherMapper(weather: IWeatherApi): IWeather {
  return {
    weatherIcon: weather.WeatherIcon,
    weatherText: weather.WeatherText,
    temperature: {
      metric: {
        value: weather.Temperature.Metric.Value,
        unit: weather.Temperature.Metric.Unit,
      },
      imperial: {
        value: weather.Temperature.Imperial.Value,
        unit: weather.Temperature.Imperial.Unit,
      },
    },
  };
}
