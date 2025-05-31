import { createAction, props } from '@ngrx/store';

import { IFavorite } from '@core/types/favorite.interface';

export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ favorite: IFavorite }>()
);
export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ id: string }>()
);
export const setFavorites = createAction(
  '[Favorites] Set Favorites',
  props<{ favorites: IFavorite[] }>()
);
