import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/booklist';

export const initial = createAction(`[${storeKey}] initial`);

export const getBooklist = createAction(
  `[${storeKey}] getBookList`,
  props<{ payload: any }>()
);

export const getBookListSuccess = createAction(
  `[${storeKey}] getBookListSuccess`,
  props<{ response: any }>()
);

export const getBookListFailed = createAction(
  `[${storeKey}] getBookListFailed`,
  props<{ response: any }>()
);

export const getBookListSystemFailed = createAction(
  `[${storeKey}] getBookListSystemFailed`,
  props<{ error: any }>()
);

export const resetBookList = createAction(
  `[${storeKey}] resetBookListSystemFailed`
);

const actions = union({
  initial,
  getBooklist,
  getBookListFailed,
  getBookListSystemFailed,
  resetBookList,
});

export type BookListUnionActions = typeof actions;
