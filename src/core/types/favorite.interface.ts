import { IWeather } from '@core/types/weather.interface';

export interface IFavoriteShortInfo {
  id: string;
  name: string;
}

export interface IFavoriteDetailedInfo extends IFavoriteShortInfo, IWeather {}
