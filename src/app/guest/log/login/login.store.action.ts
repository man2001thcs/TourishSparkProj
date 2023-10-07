import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'user/login';

export const initial = createAction(`[${storeKey}] initial`);

export const login = createAction(
  `[${storeKey}] login`,
  props<{ payload: any }>()
);

export const loginSuccess = createAction(
  `[${storeKey}] loginSuccess`,
  props<{ response: any }>()
);

export const loginFailed = createAction(
  `[${storeKey}] loginFailed`,
  props<{ response: any }>()
);

export const loginSystemFailed = createAction(
  `[${storeKey}] loginSystemFailed`,
  props<{ error: any }>()
);

export const resetLogin = createAction(
  `[${storeKey}] resetBookListSystemFailed`
);

const actions = union({
  initial,
  login,
  loginFailed,
  loginSystemFailed,
  resetLogin,
});

export type LoginUnionActions = typeof actions;
