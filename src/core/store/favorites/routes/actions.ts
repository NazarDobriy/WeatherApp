import { createAction } from "@ngrx/store";

export const removeFavoritesConfirmed = createAction('[Favorites Dialog] Remove All Confirmed Status');

export const removeFavoritesEmpty = createAction('[Favorites Dialog] Remove All Empty Status');

export const removeFavoritesClose = createAction('[Favorites Dialog] Remove All Close Status');
