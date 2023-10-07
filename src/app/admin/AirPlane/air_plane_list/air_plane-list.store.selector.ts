import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './air_plane-list.store.action';
import { State } from './air_plane-list.store.reducer';

export const airPlaneListFeatureState = createFeatureSelector<State>(storeKey);

export const getAirPlaneList = createSelector(
  airPlaneListFeatureState,
  (state) => state.airPlaneList
);

export const getDeleteStatus = createSelector(
  airPlaneListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  airPlaneListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  airPlaneListFeatureState,
  (state) => state.error
);
