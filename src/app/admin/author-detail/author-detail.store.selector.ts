import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './author-detail.store.action';
import { State } from './author-detail.store.reducer';

export const authorFeatureState = createFeatureSelector<State>(storeKey);

export const getAuthor = createSelector(
  authorFeatureState,
  (state) => state.author
);

export const editAuthor = createSelector(
  authorFeatureState,
  (state) => state.authorReturn
);

export const getMessage = createSelector(
  authorFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  authorFeatureState,
  (state) => state.error
);
