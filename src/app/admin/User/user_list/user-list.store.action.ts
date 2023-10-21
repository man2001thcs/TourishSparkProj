import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/userList';

export const initial = createAction(`[${storeKey}] initial`);

export const getUserList = createAction(
  `[${storeKey}] getUserList`,
  props<{ payload: any }>()
);

export const getUserListSuccess = createAction(
  `[${storeKey}] getUserListSuccess`,
  props<{ response: any }>()
);

export const getUserListFailed = createAction(
  `[${storeKey}] getUserListFailed`,
  props<{ response: any }>()
);

export const getUserListSystemFailed = createAction(
  `[${storeKey}] getUserListSystemFailed`,
  props<{ error: any }>()
);

export const deleteUser = createAction(
  `[${storeKey}] deleteUser`,
  props<{ payload: any }>()
);

export const deleteUserSuccess = createAction(
  `[${storeKey}] deleteUserSuccess`,
  props<{ response: any }>()
);

export const deleteUserFailed = createAction(
  `[${storeKey}] deleteUserFailed`,
  props<{ response: any }>()
);

export const deleteUserSystemFailed = createAction(
  `[${storeKey}] deleteUserSystemFailed`,
  props<{ error: any }>()
);


export const resetUserList = createAction(
  `[${storeKey}] resetUserSystemFailed`
);

const actions = union({
  initial,

  getUserList,
  getUserListFailed,
  getUserListSystemFailed,

  deleteUser,
  deleteUserFailed,
  deleteUserSystemFailed,

  resetUserList,
});

export type UserListUnionActions = typeof actions;
