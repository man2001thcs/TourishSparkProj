import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/publisherInfo';

export const initial = createAction(`[${storeKey}] initial`);

export const getPublisher = createAction(
  `[${storeKey}] getPublisher`,
  props<{ payload: any }>()
);

export const getPublisherSuccess = createAction(
  `[${storeKey}] getPublisherSuccess`,
  props<{ response: any }>()
);

export const getPublisherFailed = createAction(
  `[${storeKey}] getPublisherFailed`,
  props<{ response: any }>()
);

export const getPublisherSystemFailed = createAction(
  `[${storeKey}] getPublisherSystemFailed`,
  props<{ error: any }>()
);

export const editPublisher = createAction(
  `[${storeKey}] editPublisher`,
  props<{ payload: any }>()
);

export const editPublisherSuccess = createAction(
  `[${storeKey}] editPublisherSuccess`,
  props<{ response: any }>()
);

export const editPublisherFailed = createAction(
  `[${storeKey}] editPublisherFailed`,
  props<{ response: any }>()
);

export const editPublisherSystemFailed = createAction(
  `[${storeKey}] editPublisherSystemFailed`,
  props<{ error: any }>()
);

export const resetPublisher = createAction(
  `[${storeKey}] resetPublisherFailed`
);

const actions = union({
  initial,
  
  getPublisher,
  getPublisherFailed,
  getPublisherSystemFailed,

  editPublisher,
  editPublisherFailed,
  editPublisherSystemFailed,

  resetPublisher,
});

export type PublisherUnionActions = typeof actions;
