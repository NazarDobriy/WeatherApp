import { createReducer, on } from '@ngrx/store';

import * as FavoritesActions from './actions';
import { favoritesInitialState, IFavoritesState } from './state';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

export const favoritesReducer = createReducer(
  favoritesInitialState,
  on(FavoritesActions.addShortFavorite, (state: IFavoritesState, { shortFavorite }) => {
    return {
      ...state,
      shortFavorites: [...state.shortFavorites, shortFavorite],
    };
  }),
  on(FavoritesActions.removeShortFavorite, (state: IFavoritesState, { id }) => {
    return {
      ...state,
      shortFavorites: state.shortFavorites.filter((shortFavorite: IFavoriteShortInfo) => shortFavorite.id !== id)
    };
  }),
  on(FavoritesActions.setShortFavorites, (state: IFavoritesState, { shortFavorites }) => {
    return { ...state, shortFavorites };
  }),
  on(FavoritesActions.getDetailedFavorites, (state: IFavoritesState) => {
    return { ...state, isLoading: true };
  }),
  on(FavoritesActions.getDetailedFavoritesSuccess, (state: IFavoritesState, { detailedFavorites }) => {
    return {
      ...state,
      isLoading: false,
      detailedFavorites,
    };
  }),
  on(FavoritesActions.getDetailedFavoritesFailure, (state: IFavoritesState, { error }) => {
    return {
      ...state,
      isLoading: false,
      error,
    };
  }),
  on(FavoritesActions.updateDetailedFavorite, (state: IFavoritesState, { id }) => {
    return {
      ...state,
      detailedFavorites: state.detailedFavorites.map((item: IFavoriteDetailedInfo) => {
        return item.id === id ? { ...item, isLoading: true } : item;
      }),
    };
  }),
  on(FavoritesActions.updateDetailedFavoriteSuccess, (state: IFavoritesState, { id, weather }) => {
    return {
      ...state,
      detailedFavorites: state.detailedFavorites.map((item: IFavoriteDetailedInfo) => {
        return item.id === id ? {
          ...item,
          isLoading: false,
          ...weather,
        } : item;
      }),
    };
  }),
  on(FavoritesActions.updateDetailedFavoriteFailure, (state: IFavoritesState, { id, error }) => {
    return {
      ...state,
      detailedFavorites: state.detailedFavorites.map((item: IFavoriteDetailedInfo) => {
        return item.id === id ? {
          ...item,
          isLoading: false,
          error,
        } : item;
      }),
    };
  }),
);
