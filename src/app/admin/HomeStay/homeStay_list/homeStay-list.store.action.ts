import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/homeStayList';

export const initial = createAction(`[${storeKey}] initial`);

export const getHomeStayList = createAction(
  `[${storeKey}] getHomeStayList`,
  props<{ payload: any }>()
);

export const getHomeStayListSuccess = createAction(
  `[${storeKey}] getHomeStayListSuccess`,
  props<{ response: any }>()
);

export const getHomeStayListFailed = createAction(
  `[${storeKey}] getHomeStayListFailed`,
  props<{ response: any }>()
);

export const getHomeStayListSystemFailed = createAction(
  `[${storeKey}] getHomeStayListSystemFailed`,
  props<{ error: any }>()
);

export const deleteHomeStay = createAction(
  `[${storeKey}] deleteHomeStay`,
  props<{ payload: any }>()
);

export const deleteHomeStaySuccess = createAction(
  `[${storeKey}] deleteHomeStaySuccess`,
  props<{ response: any }>()
);

export const deleteHomeStayFailed = createAction(
  `[${storeKey}] deleteHomeStayFailed`,
  props<{ response: any }>()
);

export const deleteHomeStaySystemFailed = createAction(
  `[${storeKey}] deleteHomeStaySystemFailed`,
  props<{ error: any }>()
);


export const resetHomeStayList = createAction(
  `[${storeKey}] resetHomeStaySystemFailed`
);

const actions = union({
  initial,

  getHomeStayList,
  getHomeStayListFailed,
  getHomeStayListSystemFailed,

  deleteHomeStay,
  deleteHomeStayFailed,
  deleteHomeStaySystemFailed,

  resetHomeStayList,
});

export type HomeStayListUnionActions = typeof actions;
