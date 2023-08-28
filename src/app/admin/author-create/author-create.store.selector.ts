import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './author-create.store.action';
import { State } from './author-create.store.reducer';

export const authorFeatureState = createFeatureSelector<State>(storeKey);

export const createAuthor = createSelector(
  authorFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  authorFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  authorFeatureState,
  (state) => state.error
);
