import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './book-detail.store.action';
import { State } from './book-detail.store.reducer';

export const bookFeatureState = createFeatureSelector<State>(storeKey);

export const getBook = createSelector(
  bookFeatureState,
  (state) => state.book
);

export const editBook = createSelector(
  bookFeatureState,
  (state) => state.bookReturn
);

export const getMessage = createSelector(
  bookFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  bookFeatureState,
  (state) => state.error
);
