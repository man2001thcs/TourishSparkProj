import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './homeStay-create.store.action';
import { State } from './homeStay-create.store.reducer';

export const HomeStayFeatureState = createFeatureSelector<State>(storeKey);

export const createHomeStay = createSelector(
  HomeStayFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  HomeStayFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  HomeStayFeatureState,
  (state) => state.error
);
