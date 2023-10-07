import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './login.store.action';
import { State } from './login.store.reducer';

export const loginFeatureState = createFeatureSelector<State>(storeKey);

export const getLoginProfile = createSelector(
  loginFeatureState,
  (state) => state.loginProfile
);

export const getMessage = createSelector(
  loginFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  loginFeatureState,
  (state) => state.error
);
