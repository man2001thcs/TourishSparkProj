import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './air_plane-detail.store.action';
import { State } from './air_plane-detail.store.reducer';

export const airPlaneFeatureState = createFeatureSelector<State>(storeKey);

export const getAirPlane = createSelector(
  airPlaneFeatureState,
  (state) => state.airPlane
);

export const editAirPlane = createSelector(
  airPlaneFeatureState,
  (state) => state.airPlaneReturn
);

export const getMessage = createSelector(
  airPlaneFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  airPlaneFeatureState,
  (state) => state.error
);
