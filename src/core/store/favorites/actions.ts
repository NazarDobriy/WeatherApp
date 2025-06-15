import { createAction, props } from '@ngrx/store';

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
