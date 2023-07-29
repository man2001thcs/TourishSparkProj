import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/categoryInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getCategory = createAction(
  `[${storeKey}] getCategory`,
  props<{ payload: any }>()
);

export const getCategorySuccess = createAction(
  `[${storeKey}] getCategorySuccess`,
  props<{ response: any }>()
);

export const getCategoryFailed = createAction(
  `[${storeKey}] getCategoryFailed`,
  props<{ response: any }>()
);

export const getCategorySystemFailed = createAction(
  `[${storeKey}] getCategorySystemFailed`,
  props<{ error: any }>()
);

export const editCategory = createAction(
  `[${storeKey}] editCategory`,
  props<{ payload: any }>()
);

export const editCategorySuccess = createAction(
  `[${storeKey}] editCategorySuccess`,
  props<{ response: any }>()
);

export const editCategoryFailed = createAction(
  `[${storeKey}] editCategoryFailed`,
  props<{ response: any }>()
);

export const editCategorySystemFailed = createAction(
  `[${storeKey}] editCategorySystemFailed`,
  props<{ error: any }>()
);

export const resetCategory = createAction(
  `[${storeKey}] resetCategorySystemFailed`
);

const actions = union({
  initial,
  
  getCategory,
  getCategoryFailed,
  getCategorySystemFailed,

  editCategory,
  editCategoryFailed,
  editCategorySystemFailed,

  resetCategory,
});

export type CategoryUnionActions = typeof actions;
