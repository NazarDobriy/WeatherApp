import { IFavorite } from '@core/types/favorite.interface';

export interface IFavoritesState {
  favorites: IFavorite[];
}

export const favoritesInitialState: IFavoritesState = {
  favorites: []
};
