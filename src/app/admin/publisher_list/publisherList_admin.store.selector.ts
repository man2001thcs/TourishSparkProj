import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './publisherList_admin.store.action';
import { State } from './publisherList_admin.store.reducer';

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
