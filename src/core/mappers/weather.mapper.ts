import { IWeatherApi } from '@core/types/weather-api.interface';
import { IWeather } from '@core/types/weather.interface';

export function weatherMapper(weather: IWeatherApi): IWeather {
  return {
    weatherIcon: weather.WeatherIcon,
    weatherText: weather.WeatherText,
    temperature: {
      metric: weather.Temperature.Metric,
      imperial: weather.Temperature.Imperial,
    },
  };
}
