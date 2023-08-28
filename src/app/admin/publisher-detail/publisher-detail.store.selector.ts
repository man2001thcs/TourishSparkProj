import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './publisher-detail.store.action';
import { State } from './publisher-detail.store.reducer';

export const publisherFeatureState = createFeatureSelector<State>(storeKey);

export const getPublisher = createSelector(
  publisherFeatureState,
  (state) => state.publisher
);

export const editPublisher = createSelector(
  publisherFeatureState,
  (state) => state.publisherReturn
);

export const getMessage = createSelector(
  publisherFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  publisherFeatureState,
  (state) => state.error
);
