import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './book-create.store.action';
import { State } from './book-create.store.reducer';

export const bookFeatureState = createFeatureSelector<State>(storeKey);

export const getBook = createSelector(
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
