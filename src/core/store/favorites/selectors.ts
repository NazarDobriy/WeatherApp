import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFavoritesState } from './state';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';

const selectFeature = createFeatureSelector<IFavoritesState>('favorites');

export const selectShortFavorites = createSelector(
  selectFeature,
  ({ shortFavorites }: IFavoritesState): IFavoriteShortInfo[] => shortFavorites,
);

export const selectDetailedFavorites = createSelector(
  selectFeature,
  ({ detailedFavorites }: IFavoritesState): IFavoriteDetailedInfo[] => detailedFavorites,
);

export const selectIsLoadingDetailedFavorites = createSelector(
  selectFeature,
  ({ isLoading }: IFavoritesState): boolean => isLoading,
);

export const selectFailureDetailedFavorites = createSelector(
  selectFeature, ({ error }: IFavoritesState): string | null => error
);
