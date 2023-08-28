import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './publisher-create.store.action';
import { State } from './publisher-create.store.reducer';

export const publisherFeatureState = createFeatureSelector<State>(storeKey);

export const createPublisher = createSelector(
  publisherFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  publisherFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  publisherFeatureState,
  (state) => state.error
);
