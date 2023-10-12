import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './tourishPlan-detail.store.action';
import { State } from './tourishPlan-detail.store.reducer';

export const tourishPlanFeatureState = createFeatureSelector<State>(storeKey);

export const getTourishPlan = createSelector(
  tourishPlanFeatureState,
  (state) => state.tourishPlan
);

export const editTourishPlan = createSelector(
  tourishPlanFeatureState,
  (state) => state.tourishPlanReturn
);

export const getMessage = createSelector(
  tourishPlanFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  tourishPlanFeatureState,
  (state) => state.error
);
