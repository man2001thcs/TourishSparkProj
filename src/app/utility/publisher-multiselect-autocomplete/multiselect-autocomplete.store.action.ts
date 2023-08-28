import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/autocomplete/publisherList';

export const initial = createAction(`[${storeKey}] initial`);

export const getPublisherList = createAction(
  `[${storeKey}] getPublisherList`,
  props<{ payload: any }>()
);

export const getPublisherListSuccess = createAction(
  `[${storeKey}] getPublisherListSuccess`,
  props<{ response: any }>()
);

export const getPublisherListFailed = createAction(
  `[${storeKey}] getPublisherListFailed`,
  props<{ response: any }>()
);

export const getPublisherListSystemFailed = createAction(
  `[${storeKey}] getPublisherListSystemFailed`,
  props<{ error: any }>()
);

export const resetPublisherList = createAction(
  `[${storeKey}] resetPublisherSystemFailed`
);

const actions = union({
  initial,

  getPublisherList,
  getPublisherListFailed,
  getPublisherListSystemFailed,

  resetPublisherList,
});

export type PublisherListUnionActions = typeof actions;
