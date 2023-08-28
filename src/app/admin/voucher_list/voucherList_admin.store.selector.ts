import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './voucherList_admin.store.action';
import { State } from './voucherList_admin.store.reducer';

export const voucherListFeatureState = createFeatureSelector<State>(storeKey);

export const getVoucherList = createSelector(
  voucherListFeatureState,
  (state) => state.voucherList
);

export const getDeleteStatus = createSelector(
  voucherListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  voucherListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  voucherListFeatureState,
  (state) => state.error
);
