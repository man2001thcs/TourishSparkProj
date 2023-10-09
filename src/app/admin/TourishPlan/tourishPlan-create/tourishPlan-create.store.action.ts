import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/bookCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createTourishPlan = createAction(
  `[${storeKey}] getCreateTourishPlan`,
  props<{ payload: any }>()
);

export const createTourishPlanSuccess = createAction(
  `[${storeKey}] getCreateTourishPlanSuccess`,
  props<{ response: any }>()
);

export const createTourishPlanFailed = createAction(
  `[${storeKey}] getCreateTourishPlanFailed`,
  props<{ response: any }>()
);

export const createTourishPlanSystemFailed = createAction(
  `[${storeKey}] getCreateTourishPlanSystemFailed`,
  props<{ error: any }>()
);

export const resetTourishPlan = createAction(
  `[${storeKey}] resetTourishPlanFailed`
);

const actions = union({
  initial,

  createTourishPlan,
  createTourishPlanSuccess,
  createTourishPlanFailed,
  createTourishPlanSystemFailed,

  resetTourishPlan,
});

export type TourishPlanUnionActions = typeof actions;
