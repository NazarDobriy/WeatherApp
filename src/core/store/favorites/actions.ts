import { createAction, props } from '@ngrx/store';

import { IWeather } from "@core/types/weather.interface";
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

export const addShortFavorite = createAction(
  '[Favorites] Add Short Favorite',
  props<{ shortFavorite: IFavoriteShortInfo; }>()
);

export const removeShortFavorite = createAction(
  '[Favorites] Remove Short Favorite',
  props<{ id: string; name: string; }>()
);

export const addDetailedFavoriteSuccess = createAction(
  '[Favorites] Add Detailed Favorite Success',
  props<{ detailedFavorite: IFavoriteDetailedInfo; }>()
);

export const addDetailedFavoriteFailure = createAction(
  '[Favorites] Add Detailed Favorite Failure',
  props<{ name: string; error: string; }>()
);

export const removeFavorites = createAction('[Favorites] Remove Favorites');

export const setShortFavorites = createAction(
  '[Favorites] Set Short Favorites',
  props<{ shortFavorites: IFavoriteShortInfo[]; }>()
);

export const getDetailedFavorites = createAction(
  '[Favorites] Get Detailed Favorites',
  props<{ loadingKey: string }>(),
);

export const getDetailedFavoritesSuccess = createAction(
  '[Favorites] Get Detailed Favorites success',
  props<{ detailedFavorites: IFavoriteDetailedInfo[]; loadingKey: string }>()
);

export const getDetailedFavoritesFailure = createAction(
  '[Favorites] Get Detailed Favorites failure',
  props<{ error: string; loadingKey: string }>()
);

export const updateDetailedFavorite = createAction(
  '[Favorites] Update Detailed Favorite',
  props<{ id: string; name: string; }>()
);

export const updateDetailedFavoriteSuccess = createAction(
  '[Favorites] Update Detailed Favorite success',
  props<{ id: string; name: string; weather: IWeather; }>()
);

export const updateDetailedFavoriteFailure = createAction(
  '[Favorites] Update Detailed Favorite failure',
  props<{ id: string; name: string; error: string; }>()
);
