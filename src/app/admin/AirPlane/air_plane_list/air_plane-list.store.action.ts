import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/airPlaneList';

export const initial = createAction(`[${storeKey}] initial`);

export const getAirPlaneList = createAction(
  `[${storeKey}] getAirPlaneList`,
  props<{ payload: any }>()
);

export const getAirPlaneListSuccess = createAction(
  `[${storeKey}] getAirPlaneListSuccess`,
  props<{ response: any }>()
);

export const getAirPlaneListFailed = createAction(
  `[${storeKey}] getAirPlaneListFailed`,
  props<{ response: any }>()
);

export const getAirPlaneListSystemFailed = createAction(
  `[${storeKey}] getAirPlaneListSystemFailed`,
  props<{ error: any }>()
);

export const deleteAirPlane = createAction(
  `[${storeKey}] deleteAirPlane`,
  props<{ payload: any }>()
);

export const deleteAirPlaneSuccess = createAction(
  `[${storeKey}] deleteAirPlaneSuccess`,
  props<{ response: any }>()
);

export const deleteAirPlaneFailed = createAction(
  `[${storeKey}] deleteAirPlaneFailed`,
  props<{ response: any }>()
);

export const deleteAirPlaneSystemFailed = createAction(
  `[${storeKey}] deleteAirPlaneSystemFailed`,
  props<{ error: any }>()
);


export const resetAirPlaneList = createAction(
  `[${storeKey}] resetAirPlaneSystemFailed`
);

const actions = union({
  initial,

  getAirPlaneList,
  getAirPlaneListFailed,
  getAirPlaneListSystemFailed,

  deleteAirPlane,
  deleteAirPlaneFailed,
  deleteAirPlaneSystemFailed,

  resetAirPlaneList,
});

export type AirPlaneListUnionActions = typeof actions;
