import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './voucher-detail.store.action';
import { State } from './voucher-detail.store.reducer';

export const voucherFeatureState = createFeatureSelector<State>(storeKey);

export const getVoucher = createSelector(
  voucherFeatureState,
  (state) => state.voucher
);

export const editVoucher = createSelector(
  voucherFeatureState,
  (state) => state.voucherReturn
);

export const getMessage = createSelector(
  voucherFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  voucherFeatureState,
  (state) => state.error
);
