import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/authorCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createAuthor = createAction(
  `[${storeKey}] createAuthor`,
  props<{ payload: any }>()
);

export const createAuthorSuccess = createAction(
  `[${storeKey}] createAuthorSuccess`,
  props<{ response: any }>()
);

export const createAuthorFailed = createAction(
  `[${storeKey}] createAuthorFailed`,
  props<{ response: any }>()
);

export const createAuthorSystemFailed = createAction(
  `[${storeKey}] createAuthorSystemFailed`,
  props<{ error: any }>()
);

export const resetAuthor = createAction(
  `[${storeKey}] resetAuthorSystemFailed`
);

const actions = union({
  initial,

  createAuthor,
  createAuthorFailed,
  createAuthorSystemFailed,

  resetAuthor,
});

export type AuthorUnionActions = typeof actions;
