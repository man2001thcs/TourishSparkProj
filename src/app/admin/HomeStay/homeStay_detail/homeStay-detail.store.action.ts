import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/homeStayInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getHomeStay = createAction(
  `[${storeKey}] getHomeStay`,
  props<{ payload: any }>()
);

export const getHomeStaySuccess = createAction(
  `[${storeKey}] getHomeStaySuccess`,
  props<{ response: any }>()
);

export const getHomeStayFailed = createAction(
  `[${storeKey}] getHomeStayFailed`,
  props<{ response: any }>()
);

export const getHomeStaySystemFailed = createAction(
  `[${storeKey}] getHomeStaySystemFailed`,
  props<{ error: any }>()
);

export const editHomeStay = createAction(
  `[${storeKey}] editHomeStay`,
  props<{ payload: any }>()
);

export const editHomeStaySuccess = createAction(
  `[${storeKey}] editHomeStaySuccess`,
  props<{ response: any }>()
);

export const editHomeStayFailed = createAction(
  `[${storeKey}] editHomeStayFailed`,
  props<{ response: any }>()
);

export const editHomeStaySystemFailed = createAction(
  `[${storeKey}] editHomeStaySystemFailed`,
  props<{ error: any }>()
);

export const resetHomeStay = createAction(
  `[${storeKey}] resetHomeStayFailed`
);

const actions = union({
  initial,
  
  getHomeStay,
  getHomeStayFailed,
  getHomeStaySystemFailed,

  editHomeStay,
  editHomeStayFailed,
  editHomeStaySystemFailed,

  resetHomeStay,
});

export type HomeStayUnionActions = typeof actions;
