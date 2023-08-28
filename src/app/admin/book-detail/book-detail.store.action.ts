import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/bookInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getBook = createAction(
  `[${storeKey}] getBook`,
  props<{ payload: any }>()
);

export const getBookSuccess = createAction(
  `[${storeKey}] getBookSuccess`,
  props<{ response: any }>()
);

export const getBookFailed = createAction(
  `[${storeKey}] getBookFailed`,
  props<{ response: any }>()
);

export const getBookSystemFailed = createAction(
  `[${storeKey}] getBookSystemFailed`,
  props<{ error: any }>()
);

export const editBook = createAction(
  `[${storeKey}] editBook`,
  props<{ payload: any }>()
);

export const editBookSuccess = createAction(
  `[${storeKey}] editBookSuccess`,
  props<{ response: any }>()
);

export const editBookFailed = createAction(
  `[${storeKey}] editBookFailed`,
  props<{ response: any }>()
);

export const editBookSystemFailed = createAction(
  `[${storeKey}] editBookSystemFailed`,
  props<{ error: any }>()
);

export const resetBook = createAction(
  `[${storeKey}] resetBookFailed`
);

const actions = union({
  initial,
  
  getBook,
  getBookFailed,
  getBookSystemFailed,

  editBook,
  editBookFailed,
  editBookSystemFailed,

  resetBook,
});

export type BookUnionActions = typeof actions;
