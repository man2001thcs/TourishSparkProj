import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/categoryList';

export const initial = createAction(`[${storeKey}] initial`);

export const getCategoryList = createAction(
  `[${storeKey}] getCategoryList`,
  props<{ payload: any }>()
);

export const getCategoryListSuccess = createAction(
  `[${storeKey}] getCategoryListSuccess`,
  props<{ response: any }>()
);

export const getCategoryListFailed = createAction(
  `[${storeKey}] getCategoryListFailed`,
  props<{ response: any }>()
);

export const getCategoryListSystemFailed = createAction(
  `[${storeKey}] getCategoryListSystemFailed`,
  props<{ error: any }>()
);

export const resetCategoryList = createAction(
  `[${storeKey}] resetCategoryListSystemFailed`
);

const actions = union({
  initial,
  getCategoryList,
  getCategoryListFailed,
  getCategoryListSystemFailed,
  resetCategoryList,
});

export type CategoryListUnionActions = typeof actions;
