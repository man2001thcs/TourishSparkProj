import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './hotel-detail.store.action';
import { State } from './hotel-detail.store.reducer';

export const hotelFeatureState = createFeatureSelector<State>(storeKey);

export const getHotel = createSelector(
  hotelFeatureState,
  (state) => state.hotel
);

export const editHotel = createSelector(
  hotelFeatureState,
  (state) => state.hotelReturn
);

export const getMessage = createSelector(
  hotelFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  hotelFeatureState,
  (state) => state.error
);
