import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFavoritesState } from './state';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

const selectFavoritesFeature = createFeatureSelector<IFavoritesState>('favorites');

export const selectShortFavorites = createSelector(
  selectFavoritesFeature,
  ({ shortFavorites }: IFavoritesState): IFavoriteShortInfo[] => shortFavorites,
);

export const selectDetailedFavorites = createSelector(
  selectFavoritesFeature,
  ({ detailedFavorites }: IFavoritesState): IFavoriteDetailedInfo[] => detailedFavorites,
);

export const selectIsLoadingDetailedFavorites = createSelector(
  selectFavoritesFeature,
  ({ isLoading }: IFavoritesState): boolean => isLoading,
);

export const selectFailureDetailedFavorites = createSelector(
  selectFavoritesFeature, ({ error }: IFavoritesState): string | null => error
);
