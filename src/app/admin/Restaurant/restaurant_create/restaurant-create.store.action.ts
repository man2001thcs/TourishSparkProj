import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/RestaurantCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createRestaurant = createAction(
  `[${storeKey}] createRestaurant`,
  props<{ payload: any }>()
);

export const createRestaurantSuccess = createAction(
  `[${storeKey}] createRestaurantSuccess`,
  props<{ response: any }>()
);

export const createRestaurantFailed = createAction(
  `[${storeKey}] createRestaurantFailed`,
  props<{ response: any }>()
);

export const createRestaurantSystemFailed = createAction(
  `[${storeKey}] createRestaurantSystemFailed`,
  props<{ error: any }>()
);

export const resetRestaurant = createAction(
  `[${storeKey}] resetRestaurantSystemFailed`
);

const actions = union({
  initial,

  createRestaurant,
  createRestaurantFailed,
  createRestaurantSystemFailed,

  resetRestaurant,
});

export type RestaurantUnionActions = typeof actions;
