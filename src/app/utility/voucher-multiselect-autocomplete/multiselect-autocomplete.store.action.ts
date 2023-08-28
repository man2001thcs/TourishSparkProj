import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/autocomplete/voucherList';

export const initial = createAction(`[${storeKey}] initial`);

export const getVoucherList = createAction(
  `[${storeKey}] getVoucherList`,
  props<{ payload: any }>()
);

export const getVoucherListSuccess = createAction(
  `[${storeKey}] getVoucherListSuccess`,
  props<{ response: any }>()
);

export const getVoucherListFailed = createAction(
  `[${storeKey}] getVoucherListFailed`,
  props<{ response: any }>()
);

export const getVoucherListSystemFailed = createAction(
  `[${storeKey}] getVoucherListSystemFailed`,
  props<{ error: any }>()
);

export const resetVoucherList = createAction(
  `[${storeKey}] resetVoucherSystemFailed`
);

const actions = union({
  initial,

  getVoucherList,
  getVoucherListFailed,
  getVoucherListSystemFailed,

  resetVoucherList,
});

export type VoucherListUnionActions = typeof actions;
