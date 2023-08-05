import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './category-create.store.action';
import { State } from './category-create.store.reducer';

export const categoryFeatureState = createFeatureSelector<State>(storeKey);

export const createCategory = createSelector(
  categoryFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  categoryFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  categoryFeatureState,
  (state) => state.error
);
