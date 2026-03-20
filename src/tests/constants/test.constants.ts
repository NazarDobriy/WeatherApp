import { IWeather } from '@core/types/weather.interface';
import { ILocation } from '@core/types/location.interface';
import { ILocationsState } from '@pages/home/store/locations/state';
import { IForecast, IForecastPhase } from '@core/types/forecast.interface';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

export const MOCK_WEATHER: IWeather = {
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
  Day: {
    HasPrecipitation: false,
    Icon: 6,
    IconPhrase: 'Mostly cloudy',
  },
  Night: {
    HasPrecipitation: false,
    Icon: 38,
    IconPhrase: 'Mostly cloudy',
  },
  Temperature: {
    Maximum: {
      Unit: 'C',
      Value: 10,
    },
    Minimum: {
      Unit: 'C',
      Value: -1.2,
    },
  },
  Date: '2026-03-18T07:00:00+02:00',
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
