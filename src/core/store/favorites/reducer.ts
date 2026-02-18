import { createReducer, on } from '@ngrx/store';

import * as FavoritesActions from './actions';
import { favoritesInitialState, IFavoritesState } from './state';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

export const favoritesReducer = createReducer(
  favoritesInitialState,
  on(FavoritesActions.addShortFavorite, (state: IFavoritesState, { shortFavorite }) => {
    if (state.shortFavorites.some((item: IFavoriteShortInfo) => item.id === shortFavorite.id)) {
      return state;
    }

    return {
      ...state,
      shortFavorites: [...state.shortFavorites, shortFavorite],
    };
  }),
  on(FavoritesActions.removeShortFavorite, (state: IFavoritesState, { id }) => {
    return {
      ...state,
      shortFavorites: state.shortFavorites.filter((shortFavorite: IFavoriteShortInfo) => shortFavorite.id !== id),
      detailedFavorites: state.detailedFavorites.filter((detailedFavorite: IFavoriteDetailedInfo) => detailedFavorite.id !== id),
    };
  }),
  on(FavoritesActions.addDetailedFavoriteSuccess, (state: IFavoritesState, { detailedFavorite }) => {
    return {
      ...state,
      detailedFavorites: [...state.detailedFavorites, detailedFavorite],
    };
  }),
  on(FavoritesActions.addDetailedFavoriteFailure, (state: IFavoritesState, { error }) => {
    return { ...state, error };
  }),
  on(FavoritesActions.removeFavorites, (state: IFavoritesState) => {
    return {
      ...state,
      shortFavorites: [],
      detailedFavorites: [],
    };
  }),
  on(FavoritesActions.setShortFavorites, (state: IFavoritesState, { shortFavorites }) => {
    return { ...state, shortFavorites };
  }),
  on(FavoritesActions.getDetailedFavorites, (state: IFavoritesState, { loadingKey }) => {
    return {
      ...state,
      loading: {
        ...state.loading,
        [loadingKey]: true,
      },
    };
  }),
  on(FavoritesActions.getDetailedFavoritesSuccess, (state: IFavoritesState, { detailedFavorites, loadingKey }) => {
    return {
      ...state,
      detailedFavorites,
      loading: {
        ...state.loading,
        [loadingKey]: false,
      },
      hasLoaded: true,
    };
  }),
  on(FavoritesActions.getDetailedFavoritesFailure, (state: IFavoritesState, { error, loadingKey }) => {
    return {
      ...state,
      error,
      loading: {
        ...state.loading,
        [loadingKey]: false,
      },
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
