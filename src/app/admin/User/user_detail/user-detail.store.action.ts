import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/userInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getUser = createAction(
  `[${storeKey}] getUser`,
  props<{ payload: any }>()
);

export const getUserSuccess = createAction(
  `[${storeKey}] getUserSuccess`,
  props<{ response: any }>()
);

export const getUserFailed = createAction(
  `[${storeKey}] getUserFailed`,
  props<{ response: any }>()
);

export const getUserSystemFailed = createAction(
  `[${storeKey}] getUserSystemFailed`,
  props<{ error: any }>()
);

export const editUser = createAction(
  `[${storeKey}] editUser`,
  props<{ payload: any }>()
);

export const editUserSuccess = createAction(
  `[${storeKey}] editUserSuccess`,
  props<{ response: any }>()
);

export const editUserFailed = createAction(
  `[${storeKey}] editUserFailed`,
  props<{ response: any }>()
);

export const editUserSystemFailed = createAction(
  `[${storeKey}] editUserSystemFailed`,
  props<{ error: any }>()
);

export const resetUser = createAction(
  `[${storeKey}] resetUserFailed`
);

const actions = union({
  initial,
  
  getUser,
  getUserFailed,
  getUserSystemFailed,

  editUser,
  editUserFailed,
  editUserSystemFailed,

  resetUser,
});

export type UserUnionActions = typeof actions;
