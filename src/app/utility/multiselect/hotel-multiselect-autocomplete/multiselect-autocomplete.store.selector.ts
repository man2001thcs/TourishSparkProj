import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './multiselect-autocomplete.store.action';
import { State } from './multiselect-autocomplete.store.reducer';

export const entityListFeatureState = createFeatureSelector<State>(storeKey);

export const getHotelList = createSelector(
  entityListFeatureState,
  (state) => state.entityList
);

export const getDeleteStatus = createSelector(
  entityListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  entityListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  entityListFeatureState,
  (state) => state.error
);
