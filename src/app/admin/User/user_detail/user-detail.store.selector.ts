import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './user-detail.store.action';
import { State } from './user-detail.store.reducer';

export const userFeatureState = createFeatureSelector<State>(storeKey);

export const getUser = createSelector(
  userFeatureState,
  (state) => state.user
);

export const editUser = createSelector(
  userFeatureState,
  (state) => state.userReturn
);

export const getMessage = createSelector(
  userFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  userFeatureState,
  (state) => state.error
);
