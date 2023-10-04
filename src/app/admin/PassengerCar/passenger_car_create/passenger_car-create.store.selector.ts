import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './passenger_car-create.store.action';
import { State } from './passenger_car-create.store.reducer';

export const PassengerCarFeatureState = createFeatureSelector<State>(storeKey);

export const createPassengerCar = createSelector(
  PassengerCarFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  PassengerCarFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  PassengerCarFeatureState,
  (state) => state.error
);
