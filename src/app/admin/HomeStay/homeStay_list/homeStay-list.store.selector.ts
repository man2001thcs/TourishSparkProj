import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './homeStay-list.store.action';
import { State } from './homeStay-list.store.reducer';

export const homeStayListFeatureState = createFeatureSelector<State>(storeKey);

export const getHomeStayList = createSelector(
  homeStayListFeatureState,
  (state) => state.homeStayList
);

export const getDeleteStatus = createSelector(
  homeStayListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  homeStayListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  homeStayListFeatureState,
  (state) => state.error
);
