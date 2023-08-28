import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/authorList';

export const initial = createAction(`[${storeKey}] initial`);

export const getAuthorList = createAction(
  `[${storeKey}] getAuthorList`,
  props<{ payload: any }>()
);

export const getAuthorListSuccess = createAction(
  `[${storeKey}] getAuthorListSuccess`,
  props<{ response: any }>()
);

export const getAuthorListFailed = createAction(
  `[${storeKey}] getAuthorListFailed`,
  props<{ response: any }>()
);

export const getAuthorListSystemFailed = createAction(
  `[${storeKey}] getAuthorListSystemFailed`,
  props<{ error: any }>()
);

export const deleteAuthor = createAction(
  `[${storeKey}] deleteAuthor`,
  props<{ payload: any }>()
);

export const deleteAuthorSuccess = createAction(
  `[${storeKey}] deleteAuthorSuccess`,
  props<{ response: any }>()
);

export const deleteAuthorFailed = createAction(
  `[${storeKey}] deleteAuthorFailed`,
  props<{ response: any }>()
);

export const deleteAuthorSystemFailed = createAction(
  `[${storeKey}] deleteAuthorSystemFailed`,
  props<{ error: any }>()
);


export const resetAuthorList = createAction(
  `[${storeKey}] resetAuthorSystemFailed`
);

const actions = union({
  initial,

  getAuthorList,
  getAuthorListFailed,
  getAuthorListSystemFailed,

  deleteAuthor,
  deleteAuthorFailed,
  deleteAuthorSystemFailed,

  resetAuthorList,
});

export type AuthorListUnionActions = typeof actions;
