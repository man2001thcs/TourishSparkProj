import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/voucherCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createVoucher = createAction(
  `[${storeKey}] createVoucher`,
  props<{ payload: any }>()
);

export const createVoucherSuccess = createAction(
  `[${storeKey}] createVoucherSuccess`,
  props<{ response: any }>()
);

export const createVoucherFailed = createAction(
  `[${storeKey}] createVoucherFailed`,
  props<{ response: any }>()
);

export const createVoucherSystemFailed = createAction(
  `[${storeKey}] createVoucherSystemFailed`,
  props<{ error: any }>()
);

export const resetVoucher = createAction(
  `[${storeKey}] resetVoucherSystemFailed`
);

const actions = union({
  initial,

  createVoucher,
  createVoucherFailed,
  createVoucherSystemFailed,

  resetVoucher,
});

export type VoucherUnionActions = typeof actions;
