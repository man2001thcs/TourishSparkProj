import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/autocomplete/stayingList';

export const initial = createAction(`[${storeKey}] initial`);

export const getStayingList = createAction(
  `[${storeKey}] getStayingList`,
  props<{ payload: any }>()
);

export const getStayingListSuccess = createAction(
  `[${storeKey}] getStayingListSuccess`,
  props<{ response: any }>()
);

export const getStayingListFailed = createAction(
  `[${storeKey}] getStayingListFailed`,
  props<{ response: any }>()
);

export const getStayingListSystemFailed = createAction(
  `[${storeKey}] getStayingListSystemFailed`,
  props<{ error: any }>()
);

export const resetStayingList = createAction(
  `[${storeKey}] resetStayingSystemFailed`
);

const actions = union({
  initial,

  getStayingList,
  getStayingListFailed,
  getStayingListSystemFailed,

  resetStayingList,
});

export type StayingListUnionActions = typeof actions;
