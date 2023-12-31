import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './tourishPlanList.store.action';
import { State } from './tourishPlanList.store.reducer';

export const tourishPlanListFeatureState = createFeatureSelector<State>(storeKey);

export const getTourishPlanList = createSelector(
  tourishPlanListFeatureState,
  (state) => state.tourishPlanList
);

export const getDeleteStatus = createSelector(
  tourishPlanListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  tourishPlanListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  tourishPlanListFeatureState,
  (state) => state.error
);
