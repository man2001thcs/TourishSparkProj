import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/AirPlaneCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createAirPlane = createAction(
  `[${storeKey}] createAirPlane`,
  props<{ payload: any }>()
);

export const createAirPlaneSuccess = createAction(
  `[${storeKey}] createAirPlaneSuccess`,
  props<{ response: any }>()
);

export const createAirPlaneFailed = createAction(
  `[${storeKey}] createAirPlaneFailed`,
  props<{ response: any }>()
);

export const createAirPlaneSystemFailed = createAction(
  `[${storeKey}] createAirPlaneSystemFailed`,
  props<{ error: any }>()
);

export const resetAirPlane = createAction(
  `[${storeKey}] resetAirPlaneSystemFailed`
);

const actions = union({
  initial,

  createAirPlane,
  createAirPlaneFailed,
  createAirPlaneSystemFailed,

  resetAirPlane,
});

export type AirPlaneUnionActions = typeof actions;
