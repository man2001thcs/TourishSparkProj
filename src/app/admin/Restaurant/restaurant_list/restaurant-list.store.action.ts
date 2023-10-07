import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/restaurantList';

export const initial = createAction(`[${storeKey}] initial`);

export const getRestaurantList = createAction(
  `[${storeKey}] getRestaurantList`,
  props<{ payload: any }>()
);

export const getRestaurantListSuccess = createAction(
  `[${storeKey}] getRestaurantListSuccess`,
  props<{ response: any }>()
);

export const getRestaurantListFailed = createAction(
  `[${storeKey}] getRestaurantListFailed`,
  props<{ response: any }>()
);

export const getRestaurantListSystemFailed = createAction(
  `[${storeKey}] getRestaurantListSystemFailed`,
  props<{ error: any }>()
);

export const deleteRestaurant = createAction(
  `[${storeKey}] deleteRestaurant`,
  props<{ payload: any }>()
);

export const deleteRestaurantSuccess = createAction(
  `[${storeKey}] deleteRestaurantSuccess`,
  props<{ response: any }>()
);

export const deleteRestaurantFailed = createAction(
  `[${storeKey}] deleteRestaurantFailed`,
  props<{ response: any }>()
);

export const deleteRestaurantSystemFailed = createAction(
  `[${storeKey}] deleteRestaurantSystemFailed`,
  props<{ error: any }>()
);


export const resetRestaurantList = createAction(
  `[${storeKey}] resetRestaurantSystemFailed`
);

const actions = union({
  initial,

  getRestaurantList,
  getRestaurantListFailed,
  getRestaurantListSystemFailed,

  deleteRestaurant,
  deleteRestaurantFailed,
  deleteRestaurantSystemFailed,

  resetRestaurantList,
});

export type RestaurantListUnionActions = typeof actions;
