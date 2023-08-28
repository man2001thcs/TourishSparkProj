import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './notificationList.store.action';
import { State } from './notificationList.store.reducer';

export const notificationListFeatureState = createFeatureSelector<State>(storeKey);

export const getNotificationList = createSelector(
  notificationListFeatureState,
  (state) => state.notificationList
);

export const getDeleteStatus = createSelector(
  notificationListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  notificationListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  notificationListFeatureState,
  (state) => state.error
);
