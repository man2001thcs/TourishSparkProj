import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/bookList';

export const initial = createAction(`[${storeKey}] initial`);

export const getBookList = createAction(
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

export const deleteBook = createAction(
  `[${storeKey}] deleteBook`,
  props<{ payload: any }>()
);

export const deleteBookSuccess = createAction(
  `[${storeKey}] deleteBookSuccess`,
  props<{ response: any }>()
);

export const deleteBookFailed = createAction(
  `[${storeKey}] deleteBookFailed`,
  props<{ response: any }>()
);

export const deleteBookSystemFailed = createAction(
  `[${storeKey}] deleteBookSystemFailed`,
  props<{ error: any }>()
);


export const resetBookList = createAction(
  `[${storeKey}] resetBookSystemFailed`
);

const actions = union({
  initial,

  getBookList,
  getBookListFailed,
  getBookListSystemFailed,

  deleteBook,
  deleteBookFailed,
  deleteBookSystemFailed,

  resetBookList,
});

export type BookListUnionActions = typeof actions;
