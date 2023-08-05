import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/categoryCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createCategory = createAction(
  `[${storeKey}] createCategory`,
  props<{ payload: any }>()
);

export const createCategorySuccess = createAction(
  `[${storeKey}] createCategorySuccess`,
  props<{ response: any }>()
);

export const createCategoryFailed = createAction(
  `[${storeKey}] createCategoryFailed`,
  props<{ response: any }>()
);

export const createCategorySystemFailed = createAction(
  `[${storeKey}] createCategorySystemFailed`,
  props<{ error: any }>()
);

export const resetCategory = createAction(
  `[${storeKey}] resetCategorySystemFailed`
);

const actions = union({
  initial,

  createCategory,
  createCategoryFailed,
  createCategorySystemFailed,

  resetCategory,
});

export type CategoryUnionActions = typeof actions;
