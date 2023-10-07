import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/HotelCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createHotel = createAction(
  `[${storeKey}] createHotel`,
  props<{ payload: any }>()
);

export const createHotelSuccess = createAction(
  `[${storeKey}] createHotelSuccess`,
  props<{ response: any }>()
);

export const createHotelFailed = createAction(
  `[${storeKey}] createHotelFailed`,
  props<{ response: any }>()
);

export const createHotelSystemFailed = createAction(
  `[${storeKey}] createHotelSystemFailed`,
  props<{ error: any }>()
);

export const resetHotel = createAction(
  `[${storeKey}] resetHotelSystemFailed`
);

const actions = union({
  initial,

  createHotel,
  createHotelFailed,
  createHotelSystemFailed,

  resetHotel,
});

export type HotelUnionActions = typeof actions;
