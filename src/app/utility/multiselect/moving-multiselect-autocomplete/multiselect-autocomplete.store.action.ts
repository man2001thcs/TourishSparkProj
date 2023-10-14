import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/autocomplete/movingList';

export const initial = createAction(`[${storeKey}] initial`);

export const getMovingList = createAction(
  `[${storeKey}] getMovingList`,
  props<{ payload: any }>()
);

export const getMovingListSuccess = createAction(
  `[${storeKey}] getMovingListSuccess`,
  props<{ response: any }>()
);

export const getMovingListFailed = createAction(
  `[${storeKey}] getMovingListFailed`,
  props<{ response: any }>()
);

export const getMovingListSystemFailed = createAction(
  `[${storeKey}] getMovingListSystemFailed`,
  props<{ error: any }>()
);

export const resetMovingList = createAction(
  `[${storeKey}] resetMovingSystemFailed`
);

const actions = union({
  initial,

  getMovingList,
  getMovingListFailed,
  getMovingListSystemFailed,

  resetMovingList,
});

export type MovingListUnionActions = typeof actions;
