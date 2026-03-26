import { IWeather } from '@core/types/weather.interface';
import { ILocation } from '@core/types/location.interface';
import { ILocationsState } from '@pages/home/store/locations/state';
import { IForecast } from '@core/types/forecast.interface';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';
import { ILocationApi } from '@core/types/location-api.interface';
import { IWeatherApi } from '@core/types/weather-api.interface';

export const MOCK_WEATHER: IWeather = {
  weatherIcon: 35,
  weatherText: 'Partly cloudy',
  temperature: {
    metric: {
      value: 39,
      unit: 'F',
    },
    imperial: {
      value: 3.9,
      unit: 'C',
    },
  },
};

export const MOCK_WEATHER_API: IWeatherApi = {
  WeatherIcon: 35,
  WeatherText: 'Partly cloudy',
  Temperature: {
    Metric: {
      Value: 39,
      Unit: 'F',
    },
    Imperial: {
      Value: 3.9,
      Unit: 'C',
    },
  },
};

export const MOCK_KEY = '1201607';

export const MOCK_LOCATION: ILocation = {
  administrativeArea: { id: '46', localizedName: 'Lviv' },
  country: { id: 'UA', localizedName: 'Ukraine' },
  key: '1201607',
  localizedName: 'Zubra',
};

export const MOCK_LOCATION_API: ILocationApi = {
  AdministrativeArea: { ID: '46', LocalizedName: 'Lviv' },
  Country: { ID: 'UA', LocalizedName: 'Ukraine' },
  Key: '1201607',
  LocalizedName: 'Zubra',
};

export const MOCK_DROPDOWN: Omit<ILocationsState, 'error'> = {
  isLoading: true,
  locations: [MOCK_LOCATION],
  lastSearchedQuery: 'Rome',
};

export const MOCK_FORECAST: IForecast = {
  day: {
    hasPrecipitation: false,
    icon: 6,
    iconPhrase: 'Mostly cloudy',
  },
  night: {
    hasPrecipitation: false,
    icon: 38,
    iconPhrase: 'Mostly cloudy',
  },
  temperature: {
    maximum: {
      unit: 'C',
      value: 10,
    },
    minimum: {
      unit: 'C',
      value: -1.2,
    },
  },
  date: '2026-03-18T07:00:00+02:00',
};

const MOCK_FAVORITE_SHORT: IFavoriteShortInfo = {
  isLoading: true,
  error: 'Some error',
  name: 'New York',
  id: '4353',
};

export const MOCK_FAVORITE_DETAILED: IFavoriteDetailedInfo = {
  ...MOCK_WEATHER,
  ...MOCK_FAVORITE_SHORT,
};
