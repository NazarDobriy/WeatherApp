import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFavoritesState } from './state';
import { IFavorite } from '@core/types/favorite.interface';

const selectFeature = createFeatureSelector<IFavoritesState>('favorites');

export const selectFavorites = createSelector(
  selectFeature,
  ({ favorites }: IFavoritesState): IFavorite[] => favorites,
);
