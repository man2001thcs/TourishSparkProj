import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './multiselect-autocomplete.store.action';
import { State } from './multiselect-autocomplete.store.reducer';

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
