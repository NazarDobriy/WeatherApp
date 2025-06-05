import { createReducer, on } from '@ngrx/store';

import * as FavoritesActions from './actions';
import { favoritesInitialState, IFavoritesState } from './state';
import { IFavorite } from '@core/types/favorite.interface';

export const favoritesReducer = createReducer(
  favoritesInitialState,
  on(FavoritesActions.addFavorite, (state: IFavoritesState, action) => {
    return {
      ...state,
      favorites: [...state.favorites, action.favorite]
    };
  }),
  on(FavoritesActions.removeFavorite, (state: IFavoritesState, action) => {
    return {
      ...state,
      favorites: state.favorites.filter((favorite: IFavorite) => favorite.id !== action.id)
    };
  }),
  on(FavoritesActions.setFavorites, (state: IFavoritesState, action) => {
    return {
      ...state,
      favorites: action.favorites
    };
  })
);
