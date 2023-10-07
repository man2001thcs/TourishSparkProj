import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './restaurant-list.store.action';
import { State } from './restaurant-list.store.reducer';

export const restaurantListFeatureState = createFeatureSelector<State>(storeKey);

export const getRestaurantList = createSelector(
  restaurantListFeatureState,
  (state) => state.restaurantList
);

export const getDeleteStatus = createSelector(
  restaurantListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  restaurantListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  restaurantListFeatureState,
  (state) => state.error
);
