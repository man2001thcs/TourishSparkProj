import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './multiselect-autocomplete.store.action';
import { State } from './multiselect-autocomplete.store.reducer';

export const authorListFeatureState = createFeatureSelector<State>(storeKey);

export const getAuthorList = createSelector(
  authorListFeatureState,
  (state) => state.authorList
);

export const getDeleteStatus = createSelector(
  authorListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  authorListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  authorListFeatureState,
  (state) => state.error
);
