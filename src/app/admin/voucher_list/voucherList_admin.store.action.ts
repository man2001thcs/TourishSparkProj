import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/voucherList';

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

export const deleteVoucher = createAction(
  `[${storeKey}] deleteVoucher`,
  props<{ payload: any }>()
);

export const deleteVoucherSuccess = createAction(
  `[${storeKey}] deleteVoucherSuccess`,
  props<{ response: any }>()
);

export const deleteVoucherFailed = createAction(
  `[${storeKey}] deleteVoucherFailed`,
  props<{ response: any }>()
);

export const deleteVoucherSystemFailed = createAction(
  `[${storeKey}] deleteVoucherSystemFailed`,
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

  deleteVoucher,
  deleteVoucherFailed,
  deleteVoucherSystemFailed,

  resetVoucherList,
});

export type VoucherListUnionActions = typeof actions;
