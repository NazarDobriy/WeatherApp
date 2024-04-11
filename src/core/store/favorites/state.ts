import { IFavorite } from 'src/core/types/favorite.interface';

export interface IFavoritesState {
  favorites: IFavorite[];
}

export const favoritesInitialState: IFavoritesState = {
  favorites: []
};
