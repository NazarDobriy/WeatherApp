import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IFavoritesState } from './state';

const selectFeature = createFeatureSelector<IFavoritesState>('favorites');

export const selectFavorites = createSelector(selectFeature, ({ favorites }) => favorites);
