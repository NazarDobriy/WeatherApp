import { createAction, props } from '@ngrx/store';

export const removeFavoritesConfirmed = createAction('[Favorites Dialog] Remove All Confirmed Status');

export const removeFavoritesEmpty = createAction('[Favorites Dialog] Remove All Empty Status');

export const removeFavoritesClose = createAction('[Favorites Dialog] Remove All Close Status');

export const removeFavoriteConfirmed = createAction(
  '[Favorite Dialog] Remove Confirmed Status',
  props<{ id: string; name: string }>(),
);

export const removeFavoriteEmpty = createAction(
  '[Favorite Dialog] Remove Empty Status',
  props<{ id: string }>(),
);

export const removeFavoriteClose = createAction(
  '[Favorite Dialog] Remove Close Status',
  props<{ name: string }>(),
);
