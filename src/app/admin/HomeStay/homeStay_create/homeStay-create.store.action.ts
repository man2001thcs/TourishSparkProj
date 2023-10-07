import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/HomeStayCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createHomeStay = createAction(
  `[${storeKey}] createHomeStay`,
  props<{ payload: any }>()
);

export const createHomeStaySuccess = createAction(
  `[${storeKey}] createHomeStaySuccess`,
  props<{ response: any }>()
);

export const createHomeStayFailed = createAction(
  `[${storeKey}] createHomeStayFailed`,
  props<{ response: any }>()
);

export const createHomeStaySystemFailed = createAction(
  `[${storeKey}] createHomeStaySystemFailed`,
  props<{ error: any }>()
);

export const resetHomeStay = createAction(
  `[${storeKey}] resetHomeStaySystemFailed`
);

const actions = union({
  initial,

  createHomeStay,
  createHomeStayFailed,
  createHomeStaySystemFailed,

  resetHomeStay,
});

export type HomeStayUnionActions = typeof actions;
