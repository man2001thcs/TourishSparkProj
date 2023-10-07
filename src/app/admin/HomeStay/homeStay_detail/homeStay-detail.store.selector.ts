import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './homeStay-detail.store.action';
import { State } from './homeStay-detail.store.reducer';

export const homeStayFeatureState = createFeatureSelector<State>(storeKey);

export const getHomeStay = createSelector(
  homeStayFeatureState,
  (state) => state.homeStay
);

export const editHomeStay = createSelector(
  homeStayFeatureState,
  (state) => state.homeStayReturn
);

export const getMessage = createSelector(
  homeStayFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  homeStayFeatureState,
  (state) => state.error
);
