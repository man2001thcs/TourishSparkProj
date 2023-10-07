import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/restaurantInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getRestaurant = createAction(
  `[${storeKey}] getRestaurant`,
  props<{ payload: any }>()
);

export const getRestaurantSuccess = createAction(
  `[${storeKey}] getRestaurantSuccess`,
  props<{ response: any }>()
);

export const getRestaurantFailed = createAction(
  `[${storeKey}] getRestaurantFailed`,
  props<{ response: any }>()
);

export const getRestaurantSystemFailed = createAction(
  `[${storeKey}] getRestaurantSystemFailed`,
  props<{ error: any }>()
);

export const editRestaurant = createAction(
  `[${storeKey}] editRestaurant`,
  props<{ payload: any }>()
);

export const editRestaurantSuccess = createAction(
  `[${storeKey}] editRestaurantSuccess`,
  props<{ response: any }>()
);

export const editRestaurantFailed = createAction(
  `[${storeKey}] editRestaurantFailed`,
  props<{ response: any }>()
);

export const editRestaurantSystemFailed = createAction(
  `[${storeKey}] editRestaurantSystemFailed`,
  props<{ error: any }>()
);

export const resetRestaurant = createAction(
  `[${storeKey}] resetRestaurantFailed`
);

const actions = union({
  initial,
  
  getRestaurant,
  getRestaurantFailed,
  getRestaurantSystemFailed,

  editRestaurant,
  editRestaurantFailed,
  editRestaurantSystemFailed,

  resetRestaurant,
});

export type RestaurantUnionActions = typeof actions;
