import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './voucher-create.store.action';
import { State } from './voucher-create.store.reducer';

export const voucherFeatureState = createFeatureSelector<State>(storeKey);

export const createVoucher = createSelector(
  voucherFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  voucherFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  voucherFeatureState,
  (state) => state.error
);
