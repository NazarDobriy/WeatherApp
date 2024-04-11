import { createReducer, on } from '@ngrx/store';

import * as FavoritesActions from './actions';
import { favoritesInitialState } from './state';

export const favoritesReducer = createReducer(
  favoritesInitialState,
  on(FavoritesActions.getFavorites, (state) => state),
  on(FavoritesActions.addFavorite, (state, action) => {
    return {
      ...state,
      favorites: [...state.favorites, action.favorite]
    };
  }),
  on(FavoritesActions.removeFavorite, (state, action) => {
    return {
      ...state,
      favorites: state.favorites.filter((favorite) => favorite.id !== action.id)
    };
  }),
  on(FavoritesActions.setFavorites, (state, action) => {
    return {
      ...state,
      favorites: action.favorites
    };
  })
);
