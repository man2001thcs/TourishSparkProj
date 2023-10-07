import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './hotel-list.store.action';
import { State } from './hotel-list.store.reducer';

export const hotelListFeatureState = createFeatureSelector<State>(storeKey);

export const getHotelList = createSelector(
  hotelListFeatureState,
  (state) => state.hotelList
);

export const getDeleteStatus = createSelector(
  hotelListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  hotelListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  hotelListFeatureState,
  (state) => state.error
);
