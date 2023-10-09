import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './tourishPlan-create.store.action';
import { State } from './tourishPlan-create.store.reducer';

export const tourishPlanFeatureState = createFeatureSelector<State>(storeKey);

export const getTourishPlan = createSelector(
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
