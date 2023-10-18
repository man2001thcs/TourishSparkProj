import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './signIn-create.store.action';
import { State } from './signIn-create.store.reducer';

export const userFeatureState = createFeatureSelector<State>(storeKey);

export const getUser = createSelector(
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
