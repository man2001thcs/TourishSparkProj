import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/tourishPlanInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getTourishPlan = createAction(
  `[${storeKey}] getTourishPlan`,
  props<{ payload: any }>()
);

export const getTourishPlanSuccess = createAction(
  `[${storeKey}] getTourishPlanSuccess`,
  props<{ response: any }>()
);

export const getTourishPlanFailed = createAction(
  `[${storeKey}] getTourishPlanFailed`,
  props<{ response: any }>()
);

export const getTourishPlanSystemFailed = createAction(
  `[${storeKey}] getTourishPlanSystemFailed`,
  props<{ error: any }>()
);

export const editTourishPlan = createAction(
  `[${storeKey}] editTourishPlan`,
  props<{ payload: any }>()
);

export const editTourishPlanSuccess = createAction(
  `[${storeKey}] editTourishPlanSuccess`,
  props<{ response: any }>()
);

export const editTourishPlanFailed = createAction(
  `[${storeKey}] editTourishPlanFailed`,
  props<{ response: any }>()
);

export const editTourishPlanSystemFailed = createAction(
  `[${storeKey}] editTourishPlanSystemFailed`,
  props<{ error: any }>()
);

export const resetTourishPlan = createAction(
  `[${storeKey}] resetTourishPlanFailed`
);

const actions = union({
  initial,
  
  getTourishPlan,
  getTourishPlanFailed,
  getTourishPlanSystemFailed,

  editTourishPlan,
  editTourishPlanFailed,
  editTourishPlanSystemFailed,

  resetTourishPlan,
});

export type TourishPlanUnionActions = typeof actions;
