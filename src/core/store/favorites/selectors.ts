import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFavoritesState } from './state';
import { IFavoriteDetailedInfo, IFavoriteShortInfo } from '@core/types/favorite.interface';
import { FavoritesLoadingType } from "@core/types/favorites-loading.type";

const selectFavoritesFeature = createFeatureSelector<IFavoritesState>('favorites');

export const selectShortFavorites = createSelector(
  selectFavoritesFeature,
  ({ shortFavorites }: IFavoritesState): IFavoriteShortInfo[] => shortFavorites,
);

export const selectDetailedFavorites = createSelector(
  selectFavoritesFeature,
  ({ detailedFavorites }: IFavoritesState): IFavoriteDetailedInfo[] => detailedFavorites,
);

export const selectDetailedFavoritesHasLoaded = createSelector(
  selectFavoritesFeature,
  ({ hasLoaded }: IFavoritesState): boolean => hasLoaded,
);

export const selectDetailedFavoritesLength = createSelector(
  selectFavoritesFeature,
  ({ detailedFavorites }: IFavoritesState): number => detailedFavorites.length,
);

export const selectLoadingDetailedFavorites = (loadingKey: FavoritesLoadingType) => createSelector(
  selectFavoritesFeature,
  ({ loading }: IFavoritesState): boolean => loading[loadingKey] || false,
);

export const selectFailureDetailedFavorites = createSelector(
  selectFavoritesFeature, ({ error }: IFavoritesState): string | null => error
);
