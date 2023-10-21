import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './user-list.store.action';
import { State } from './user-list.store.reducer';

export const userListFeatureState = createFeatureSelector<State>(storeKey);

export const getUserList = createSelector(
  userListFeatureState,
  (state) => state.userList
);

export const getDeleteStatus = createSelector(
  userListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  userListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  userListFeatureState,
  (state) => state.error
);
