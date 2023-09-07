import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/authorCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const getMessage = createAction(
  `[${storeKey}] getMessage`,
  props<{ payload: any }>()
);

export const getMessageSuccess = createAction(
  `[${storeKey}] getMessageSuccess`,
  props<{ response: any }>()
);

export const getMessageFailed = createAction(
  `[${storeKey}] getMessageFailed`,
  props<{ response: any }>()
);

export const getMessageSystemFailed = createAction(
  `[${storeKey}] getMessageSystemFailed`,
  props<{ error: any }>()
);

export const resetMessage = createAction(
  `[${storeKey}] resetMessageSystemFailed`
);

const actions = union({
  initial,

  getMessage,
  getMessageFailed,
  getMessageSystemFailed,

  resetMessage,
});

export type MessageUnionActions = typeof actions;
