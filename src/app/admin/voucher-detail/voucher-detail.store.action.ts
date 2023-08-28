import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/voucherInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getVoucher = createAction(
  `[${storeKey}] getVoucher`,
  props<{ payload: any }>()
);

export const getVoucherSuccess = createAction(
  `[${storeKey}] getVoucherSuccess`,
  props<{ response: any }>()
);

export const getVoucherFailed = createAction(
  `[${storeKey}] getVoucherFailed`,
  props<{ response: any }>()
);

export const getVoucherSystemFailed = createAction(
  `[${storeKey}] getVoucherSystemFailed`,
  props<{ error: any }>()
);

export const editVoucher = createAction(
  `[${storeKey}] editVoucher`,
  props<{ payload: any }>()
);

export const editVoucherSuccess = createAction(
  `[${storeKey}] editVoucherSuccess`,
  props<{ response: any }>()
);

export const editVoucherFailed = createAction(
  `[${storeKey}] editVoucherFailed`,
  props<{ response: any }>()
);

export const editVoucherSystemFailed = createAction(
  `[${storeKey}] editVoucherSystemFailed`,
  props<{ error: any }>()
);

export const resetVoucher = createAction(
  `[${storeKey}] resetVoucherFailed`
);

const actions = union({
  initial,
  
  getVoucher,
  getVoucherFailed,
  getVoucherSystemFailed,

  editVoucher,
  editVoucherFailed,
  editVoucherSystemFailed,

  resetVoucher,
});

export type VoucherUnionActions = typeof actions;
