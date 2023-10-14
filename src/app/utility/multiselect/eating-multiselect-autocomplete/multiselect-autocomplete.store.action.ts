import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/autocomplete/eatingList';

export const initial = createAction(`[${storeKey}] initial`);

export const getEatingList = createAction(
  `[${storeKey}] getEatingList`,
  props<{ payload: any }>()
);

export const getEatingListSuccess = createAction(
  `[${storeKey}] getEatingListSuccess`,
  props<{ response: any }>()
);

export const getEatingListFailed = createAction(
  `[${storeKey}] getEatingListFailed`,
  props<{ response: any }>()
);

export const getEatingListSystemFailed = createAction(
  `[${storeKey}] getEatingListSystemFailed`,
  props<{ error: any }>()
);

export const resetEatingList = createAction(
  `[${storeKey}] resetEatingSystemFailed`
);

const actions = union({
  initial,

  getEatingList,
  getEatingListFailed,
  getEatingListSystemFailed,

  resetEatingList,
});

export type EatingListUnionActions = typeof actions;
