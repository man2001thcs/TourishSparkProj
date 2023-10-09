import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/tourishPlanList';

export const initial = createAction(`[${storeKey}] initial`);

export const getTourishPlanList = createAction(
  `[${storeKey}] getTourishPlanList`,
  props<{ payload: any }>()
);

export const getTourishPlanListSuccess = createAction(
  `[${storeKey}] getTourishPlanListSuccess`,
  props<{ response: any }>()
);

export const getTourishPlanListFailed = createAction(
  `[${storeKey}] getTourishPlanListFailed`,
  props<{ response: any }>()
);

export const getTourishPlanListSystemFailed = createAction(
  `[${storeKey}] getTourishPlanListSystemFailed`,
  props<{ error: any }>()
);

export const deleteTourishPlan = createAction(
  `[${storeKey}] deleteTourishPlan`,
  props<{ payload: any }>()
);

export const deleteTourishPlanSuccess = createAction(
  `[${storeKey}] deleteTourishPlanSuccess`,
  props<{ response: any }>()
);

export const deleteTourishPlanFailed = createAction(
  `[${storeKey}] deleteTourishPlanFailed`,
  props<{ response: any }>()
);

export const deleteTourishPlanSystemFailed = createAction(
  `[${storeKey}] deleteTourishPlanSystemFailed`,
  props<{ error: any }>()
);


export const resetTourishPlanList = createAction(
  `[${storeKey}] resetTourishPlanSystemFailed`
);

const actions = union({
  initial,

  getTourishPlanList,
  getTourishPlanListFailed,
  getTourishPlanListSystemFailed,

  deleteTourishPlan,
  deleteTourishPlanFailed,
  deleteTourishPlanSystemFailed,

  resetTourishPlanList,
});

export type TourishPlanListUnionActions = typeof actions;
