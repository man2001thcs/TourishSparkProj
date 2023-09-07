import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './chat.store.action';
import { State } from './chat.store.reducer';

export const messageFeatureState = createFeatureSelector<State>(storeKey);

export const getMessage = createSelector(
  messageFeatureState,
  (state) => state.messageList
);

export const getSysError = createSelector(
  messageFeatureState,
  (state) => state.error
);
