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

export const deleteCategory = createAction(
  `[${storeKey}] deleteCategory`,
  props<{ payload: any }>()
);

export const deleteCategorySuccess = createAction(
  `[${storeKey}] deleteCategorySuccess`,
  props<{ response: any }>()
);

export const deleteCategoryFailed = createAction(
  `[${storeKey}] deleteCategoryFailed`,
  props<{ response: any }>()
);

export const deleteCategorySystemFailed = createAction(
  `[${storeKey}] deleteCategorySystemFailed`,
  props<{ error: any }>()
);


export const resetCategoryList = createAction(
  `[${storeKey}] resetCategorySystemFailed`
);

const actions = union({
  initial,

  getCategoryList,
  getCategoryListFailed,
  getCategoryListSystemFailed,

  deleteCategory,
  deleteCategoryFailed,
  deleteCategorySystemFailed,

  resetCategoryList,
});

export type CategoryListUnionActions = typeof actions;
