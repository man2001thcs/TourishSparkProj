import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/PassengerCarCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createPassengerCar = createAction(
  `[${storeKey}] createPassengerCar`,
  props<{ payload: any }>()
);

export const createPassengerCarSuccess = createAction(
  `[${storeKey}] createPassengerCarSuccess`,
  props<{ response: any }>()
);

export const createPassengerCarFailed = createAction(
  `[${storeKey}] createPassengerCarFailed`,
  props<{ response: any }>()
);

export const createPassengerCarSystemFailed = createAction(
  `[${storeKey}] createPassengerCarSystemFailed`,
  props<{ error: any }>()
);

export const resetPassengerCar = createAction(
  `[${storeKey}] resetPassengerCarSystemFailed`
);

const actions = union({
  initial,

  createPassengerCar,
  createPassengerCarFailed,
  createPassengerCarSystemFailed,

  resetPassengerCar,
});

export type PassengerCarUnionActions = typeof actions;
