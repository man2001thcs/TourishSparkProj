import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './hotel-create.store.action';
import { State } from './hotel-create.store.reducer';

export const HotelFeatureState = createFeatureSelector<State>(storeKey);

export const createHotel = createSelector(
  HotelFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  HotelFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  HotelFeatureState,
  (state) => state.error
);
