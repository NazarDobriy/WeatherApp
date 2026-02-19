import { IWeather } from '@core/types/weather.interface';
import { IBaseEntity } from "@core/types/base-entity.interface";

export interface IFavoriteShortInfo extends IBaseEntity{
  isLoading: boolean;
  error: string | null;
}

export interface IFavoriteDetailedInfo extends IFavoriteShortInfo, IWeather {}
