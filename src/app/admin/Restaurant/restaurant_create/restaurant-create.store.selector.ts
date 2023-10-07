import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './restaurant-create.store.action';
import { State } from './restaurant-create.store.reducer';

export const RestaurantFeatureState = createFeatureSelector<State>(storeKey);

export const createRestaurant = createSelector(
  RestaurantFeatureState,
  (state) => state.createStatus
);

export const getMessage = createSelector(
  RestaurantFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  RestaurantFeatureState,
  (state) => state.error
);
