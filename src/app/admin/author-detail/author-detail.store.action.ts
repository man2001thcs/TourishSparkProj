import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/authorInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getAuthor = createAction(
  `[${storeKey}] getAuthor`,
  props<{ payload: any }>()
);

export const getAuthorSuccess = createAction(
  `[${storeKey}] getAuthorSuccess`,
  props<{ response: any }>()
);

export const getAuthorFailed = createAction(
  `[${storeKey}] getAuthorFailed`,
  props<{ response: any }>()
);

export const getAuthorSystemFailed = createAction(
  `[${storeKey}] getAuthorSystemFailed`,
  props<{ error: any }>()
);

export const editAuthor = createAction(
  `[${storeKey}] editAuthor`,
  props<{ payload: any }>()
);

export const editAuthorSuccess = createAction(
  `[${storeKey}] editAuthorSuccess`,
  props<{ response: any }>()
);

export const editAuthorFailed = createAction(
  `[${storeKey}] editAuthorFailed`,
  props<{ response: any }>()
);

export const editAuthorSystemFailed = createAction(
  `[${storeKey}] editAuthorSystemFailed`,
  props<{ error: any }>()
);

export const resetAuthor = createAction(
  `[${storeKey}] resetAuthorFailed`
);

const actions = union({
  initial,
  
  getAuthor,
  getAuthorFailed,
  getAuthorSystemFailed,

  editAuthor,
  editAuthorFailed,
  editAuthorSystemFailed,

  resetAuthor,
});

export type AuthorUnionActions = typeof actions;
