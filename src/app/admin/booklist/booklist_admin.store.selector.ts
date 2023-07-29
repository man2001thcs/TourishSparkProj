import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './booklist_admin.store.action';
import { State } from './booklist.store.reducer';

export const bookListFeatureState = createFeatureSelector<State>(storeKey);

export const bookList = createSelector(
  bookListFeatureState,
  (state) => state.bookList
);
