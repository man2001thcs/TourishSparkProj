import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/hotelList';

export const initial = createAction(`[${storeKey}] initial`);

export const getHotelList = createAction(
  `[${storeKey}] getHotelList`,
  props<{ payload: any }>()
);

export const getHotelListSuccess = createAction(
  `[${storeKey}] getHotelListSuccess`,
  props<{ response: any }>()
);

export const getHotelListFailed = createAction(
  `[${storeKey}] getHotelListFailed`,
  props<{ response: any }>()
);

export const getHotelListSystemFailed = createAction(
  `[${storeKey}] getHotelListSystemFailed`,
  props<{ error: any }>()
);

export const deleteHotel = createAction(
  `[${storeKey}] deleteHotel`,
  props<{ payload: any }>()
);

export const deleteHotelSuccess = createAction(
  `[${storeKey}] deleteHotelSuccess`,
  props<{ response: any }>()
);

export const deleteHotelFailed = createAction(
  `[${storeKey}] deleteHotelFailed`,
  props<{ response: any }>()
);

export const deleteHotelSystemFailed = createAction(
  `[${storeKey}] deleteHotelSystemFailed`,
  props<{ error: any }>()
);


export const resetHotelList = createAction(
  `[${storeKey}] resetHotelSystemFailed`
);

const actions = union({
  initial,

  getHotelList,
  getHotelListFailed,
  getHotelListSystemFailed,

  deleteHotel,
  deleteHotelFailed,
  deleteHotelSystemFailed,

  resetHotelList,
});

export type HotelListUnionActions = typeof actions;
