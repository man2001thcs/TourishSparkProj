import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/hotelInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getHotel = createAction(
  `[${storeKey}] getHotel`,
  props<{ payload: any }>()
);

export const getHotelSuccess = createAction(
  `[${storeKey}] getHotelSuccess`,
  props<{ response: any }>()
);

export const getHotelFailed = createAction(
  `[${storeKey}] getHotelFailed`,
  props<{ response: any }>()
);

export const getHotelSystemFailed = createAction(
  `[${storeKey}] getHotelSystemFailed`,
  props<{ error: any }>()
);

export const editHotel = createAction(
  `[${storeKey}] editHotel`,
  props<{ payload: any }>()
);

export const editHotelSuccess = createAction(
  `[${storeKey}] editHotelSuccess`,
  props<{ response: any }>()
);

export const editHotelFailed = createAction(
  `[${storeKey}] editHotelFailed`,
  props<{ response: any }>()
);

export const editHotelSystemFailed = createAction(
  `[${storeKey}] editHotelSystemFailed`,
  props<{ error: any }>()
);

export const resetHotel = createAction(
  `[${storeKey}] resetHotelFailed`
);

const actions = union({
  initial,
  
  getHotel,
  getHotelFailed,
  getHotelSystemFailed,

  editHotel,
  editHotelFailed,
  editHotelSystemFailed,

  resetHotel,
});

export type HotelUnionActions = typeof actions;
