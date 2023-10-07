import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/airPlaneInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getAirPlane = createAction(
  `[${storeKey}] getAirPlane`,
  props<{ payload: any }>()
);

export const getAirPlaneSuccess = createAction(
  `[${storeKey}] getAirPlaneSuccess`,
  props<{ response: any }>()
);

export const getAirPlaneFailed = createAction(
  `[${storeKey}] getAirPlaneFailed`,
  props<{ response: any }>()
);

export const getAirPlaneSystemFailed = createAction(
  `[${storeKey}] getAirPlaneSystemFailed`,
  props<{ error: any }>()
);

export const editAirPlane = createAction(
  `[${storeKey}] editAirPlane`,
  props<{ payload: any }>()
);

export const editAirPlaneSuccess = createAction(
  `[${storeKey}] editAirPlaneSuccess`,
  props<{ response: any }>()
);

export const editAirPlaneFailed = createAction(
  `[${storeKey}] editAirPlaneFailed`,
  props<{ response: any }>()
);

export const editAirPlaneSystemFailed = createAction(
  `[${storeKey}] editAirPlaneSystemFailed`,
  props<{ error: any }>()
);

export const resetAirPlane = createAction(
  `[${storeKey}] resetAirPlaneFailed`
);

const actions = union({
  initial,
  
  getAirPlane,
  getAirPlaneFailed,
  getAirPlaneSystemFailed,

  editAirPlane,
  editAirPlaneFailed,
  editAirPlaneSystemFailed,

  resetAirPlane,
});

export type AirPlaneUnionActions = typeof actions;
