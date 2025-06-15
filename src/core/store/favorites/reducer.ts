import { createReducer, on } from '@ngrx/store';

import * as FavoritesActions from './actions';
import { favoritesInitialState, IFavoritesState } from './state';
import { IFavoriteShortInfo } from '@core/types/favorite.interface';

export const favoritesReducer = createReducer(
  favoritesInitialState,
  on(FavoritesActions.addShortFavorite, (state: IFavoritesState, action) => {
    return {
      ...state,
      shortFavorites: [...state.shortFavorites, action.shortFavorite],
    };
  }),
  on(FavoritesActions.removeShortFavorite, (state: IFavoritesState, action) => {
    return {
      ...state,
      shortFavorites: state.shortFavorites.filter((shortFavorite: IFavoriteShortInfo) => shortFavorite.id !== action.id)
    };
  }),
  on(FavoritesActions.setShortFavorites, (state: IFavoritesState, action) => {
    return {
      ...state,
      shortFavorites: action.shortFavorites,
    };
  }),
  on(FavoritesActions.getDetailedFavorites, (state: IFavoritesState) => {
    return {
      ...state,
      isLoading: true,
    };
  }),
  on(FavoritesActions.getDetailedFavoritesSuccess, (state: IFavoritesState, action) => {
    return {
      ...state,
      isLoading: false,
      detailedFavorites: action.detailedFavorites,
    };
  }),
  on(FavoritesActions.getDetailedFavoritesFailure, (state: IFavoritesState, action) => {
    return {
      ...state,
      isLoading: false,
      error: action.error,
    };
  }),
);
