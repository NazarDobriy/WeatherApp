import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

export interface IFavoritesState {
  shortFavorites: IFavoriteShortInfo[];
  detailedFavorites: IFavoriteDetailedInfo[];
  isLoading: boolean;
  error: string | null;
}

export const favoritesInitialState: IFavoritesState = {
  shortFavorites: [],
  detailedFavorites:[],
  isLoading: false,
  error: null,
};
