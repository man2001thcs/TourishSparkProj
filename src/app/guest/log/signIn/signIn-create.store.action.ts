import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'guest/userCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createUser = createAction(
  `[${storeKey}] getCreateUser`,
  props<{ payload: any }>()
);

export const createUserSuccess = createAction(
  `[${storeKey}] getCreateUserSuccess`,
  props<{ response: any }>()
);

export const createUserFailed = createAction(
  `[${storeKey}] getCreateUserFailed`,
  props<{ response: any }>()
);

export const createUserSystemFailed = createAction(
  `[${storeKey}] getCreateUserSystemFailed`,
  props<{ error: any }>()
);

export const resetUser = createAction(
  `[${storeKey}] resetUserFailed`
);

const actions = union({
  initial,

  createUser,
  createUserSuccess,
  createUserFailed,
  createUserSystemFailed,

  resetUser,
});

export type UserUnionActions = typeof actions;
