import { IWeather } from '@pages/home/types/weather.interface';

export interface IFavoriteShortInfo {
  id: string;
  name: string;
}

export interface IFavoriteDetailedInfo extends IFavoriteShortInfo, IWeather {}
