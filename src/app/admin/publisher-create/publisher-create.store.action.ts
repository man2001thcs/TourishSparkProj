import { Action, createAction, props, union } from '@ngrx/store';

export const storeKey = 'admin/publisherCreate';

export const initial = createAction(`[${storeKey}] initial`);

export const createPublisher = createAction(
  `[${storeKey}] createPublisher`,
  props<{ payload: any }>()
);

export const createPublisherSuccess = createAction(
  `[${storeKey}] createPublisherSuccess`,
  props<{ response: any }>()
);

export const createPublisherFailed = createAction(
  `[${storeKey}] createPublisherFailed`,
  props<{ response: any }>()
);

export const createPublisherSystemFailed = createAction(
  `[${storeKey}] createPublisherSystemFailed`,
  props<{ error: any }>()
);

export const resetPublisher = createAction(
  `[${storeKey}] resetPublisherSystemFailed`
);

const actions = union({
  initial,

  createPublisher,
  createPublisherFailed,
  createPublisherSystemFailed,

  resetPublisher,
});

export type PublisherUnionActions = typeof actions;
