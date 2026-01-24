import { createAction, props } from '@ngrx/store';

import { IWeather } from "@core/types/weather.interface";
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

export const addShortFavorite = createAction(
  '[Favorites] Add Short Favorite',
  props<{ shortFavorite: IFavoriteShortInfo; }>()
);

export const removeShortFavorite = createAction(
  '[Favorites] Remove Short Favorite',
  props<{ id: string; }>()
);

export const setShortFavorites = createAction(
  '[Favorites] Set Short Favorites',
  props<{ shortFavorites: IFavoriteShortInfo[]; }>()
);

export const getDetailedFavorites = createAction(
  '[Favorites] Get Detailed Favorites',
  props<{ shortFavorites: IFavoriteShortInfo[]; }>()
);

export const getDetailedFavoritesSuccess = createAction(
  '[Favorites] Get Detailed Favorites success',
  props<{ detailedFavorites: IFavoriteDetailedInfo[]; }>()
);

export const getDetailedFavoritesFailure = createAction(
  '[Favorites] Get Detailed Favorites failure',
  props<{ error: string; }>()
);

export const updateDetailedFavorite = createAction(
  '[Favorites] Update Detailed Favorite',
  props<{ id: string; }>()
);

export const updateDetailedFavoriteSuccess = createAction(
  '[Favorites] Update Detailed Favorite success',
  props<{ id: string; weather: IWeather; }>()
);

export const updateDetailedFavoriteFailure = createAction(
  '[Favorites] Update Detailed Favorite failure',
  props<{ id: string; error: string; }>()
);
