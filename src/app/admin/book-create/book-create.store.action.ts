import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/bookCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createBook = createAction(
  `[${storeKey}] getCreateBook`,
  props<{ payload: any }>()
);

export const createBookSuccess = createAction(
  `[${storeKey}] getCreateBookSuccess`,
  props<{ response: any }>()
);

export const createBookFailed = createAction(
  `[${storeKey}] getCreateBookFailed`,
  props<{ response: any }>()
);

export const createBookSystemFailed = createAction(
  `[${storeKey}] getCreateBookSystemFailed`,
  props<{ error: any }>()
);

export const resetBook = createAction(
  `[${storeKey}] resetBookFailed`
);

const actions = union({
  initial,

  createBook,
  createBookSuccess,
  createBookFailed,
  createBookSystemFailed,

  resetBook,
});

export type BookUnionActions = typeof actions;
