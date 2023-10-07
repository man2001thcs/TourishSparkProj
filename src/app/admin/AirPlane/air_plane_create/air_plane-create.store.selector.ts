import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './air_plane-create.store.action';
import { State } from './air_plane-create.store.reducer';

export const AirPlaneFeatureState = createFeatureSelector<State>(storeKey);

export const createAirPlane = createSelector(
  AirPlaneFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  AirPlaneFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  AirPlaneFeatureState,
  (state) => state.error
);
