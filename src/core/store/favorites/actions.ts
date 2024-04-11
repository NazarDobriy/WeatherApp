import { createAction, props } from '@ngrx/store';

import { IFavorite } from 'src/core/types/favorite.interface';

export const getFavorites = createAction('[Favorites] Get Favorites');
export const addFavorite = createAction(
  '[Favorites] Add Favorite',
  props<{ favorite: IFavorite }>()
);
export const removeFavorite = createAction(
  '[Favorites] Remove Favorite',
  props<{ id: string }>()
);
