import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './category-detail.store.action';
import { State } from './category-detail.store.reducer';

export const categoryFeatureState = createFeatureSelector<State>(storeKey);

export const getCategory = createSelector(
  categoryFeatureState,
  (state) => state.category
);

export const editCategory = createSelector(
  categoryFeatureState,
  (state) => state.messageCode
);
