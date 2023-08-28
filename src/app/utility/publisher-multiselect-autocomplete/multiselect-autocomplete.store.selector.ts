import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './multiselect-autocomplete.store.action';
import { State } from './multiselect-autocomplete.store.reducer';

export const publisherListFeatureState = createFeatureSelector<State>(storeKey);

export const getPublisherList = createSelector(
  publisherListFeatureState,
  (state) => state.publisherList
);

export const getDeleteStatus = createSelector(
  publisherListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  publisherListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  publisherListFeatureState,
  (state) => state.error
);
