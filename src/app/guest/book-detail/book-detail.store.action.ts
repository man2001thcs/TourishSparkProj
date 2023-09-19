import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'guest/bookInfo';

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

export const getImageList = createAction(
  `[${storeKey}] getImageList`,
  props<{ payload: any }>()
);

export const getImageListSuccess = createAction(
  `[${storeKey}] getImageListSuccess`,
  props<{ response: any }>()
);

export const getImageListFailed = createAction(
  `[${storeKey}] getImageListFailed`,
  props<{ response: any }>()
);

export const getImageListSystemFailed = createAction(
  `[${storeKey}] getImageListSystemFailed`,
  props<{ error: any }>()
);

export const resetBook = createAction(
  `[${storeKey}] resetBookFailed`
);

const actions = union({
  initial,
  
  getBook,
  getBookSuccess,
  getBookFailed,
  getBookSystemFailed,

  getImageList,
  getImageListSuccess,
  getImageListFailed,
  getImageListSystemFailed,
  
  resetBook,
});

export type BookUnionActions = typeof actions;
