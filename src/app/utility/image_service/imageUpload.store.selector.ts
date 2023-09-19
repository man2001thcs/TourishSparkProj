import { createFeatureSelector, createSelector } from '@ngrx/store';
import { storeKey } from './imageUpload.store.action';
import { State } from './imageUpload.store.reducer';

export const imageListFeatureState = createFeatureSelector<State>(storeKey);

export const getImageList = createSelector(
  imageListFeatureState,
  (state) => state.imageList
);

export const getDeleteStatus = createSelector(
  imageListFeatureState,
  (state) => state.deleteStatus
);

export const getMessage = createSelector(
  imageListFeatureState,
  (state) => state.messageCode
);

export const getSysError = createSelector(
  imageListFeatureState,
  (state) => state.error
);
