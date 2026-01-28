import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';
import { FavoritesLoadingType } from "@core/types/favorites-loading.type";

export interface IFavoritesState {
  shortFavorites: IFavoriteShortInfo[];
  detailedFavorites: IFavoriteDetailedInfo[];
  loading: Partial<Record<FavoritesLoadingType, boolean>>;
  error: string | null;
}

export const favoritesInitialState: IFavoritesState = {
  shortFavorites: [],
  detailedFavorites:[],
  loading: {},
  error: null,
};
