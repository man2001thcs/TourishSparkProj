import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './categoryList_admin.store.action';
import { State } from './categoryList_admin.store.reducer';

export const categoryListFeatureState = createFeatureSelector<State>(storeKey);

export const getCategoryList = createSelector(
  categoryListFeatureState,
  (state) => state.categoryList
);

export const getDeleteStatus = createSelector(
  categoryListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  categoryListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  categoryListFeatureState,
  (state) => state.error
);
