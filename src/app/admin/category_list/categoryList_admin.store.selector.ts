import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './categoryList_admin.store.action';
import { State } from './categoryList_admin.store.reducer';

export const categoryListFeatureState = createFeatureSelector<State>(storeKey);

export const getCategoryList = createSelector(
  categoryListFeatureState,
  (state) => state.categoryList
);
