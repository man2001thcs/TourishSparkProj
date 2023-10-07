import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './restaurant-detail.store.action';
import { State } from './restaurant-detail.store.reducer';

export const restaurantFeatureState = createFeatureSelector<State>(storeKey);

export const getRestaurant = createSelector(
  restaurantFeatureState,
  (state) => state.restaurant
);

export const editRestaurant = createSelector(
  restaurantFeatureState,
  (state) => state.restaurantReturn
);

export const getMessage = createSelector(
  restaurantFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  restaurantFeatureState,
  (state) => state.error
);
