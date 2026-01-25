import { IWeather } from '@core/types/weather.interface';

export interface IFavoriteShortInfo {
  id: string;
  name: string;
  isLoading: boolean;
  error: string | null;
}

export interface IFavoriteDetailedInfo extends IFavoriteShortInfo, IWeather {}
