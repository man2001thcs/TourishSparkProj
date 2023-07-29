import { createReducer, on } from '@ngrx/store';
import * as CategoryAction from './category-detail.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  category: any;
}

export const initialState: State = {
  category: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(CategoryAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(CategoryAction.getCategory, (state, { payload }) => ({
    ...state,
  })),

  on(CategoryAction.getCategorySuccess, (state, { response }) => ({
    ...state,
    category: response.data,
  })),

  on(CategoryAction.getCategoryFailed, (state, { response }) => ({
    ...state,
    message: response.message,
  })),

  on(CategoryAction.getCategorySystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(CategoryAction.editCategory, (state, { payload }) => ({
    ...state,
  })),

  on(CategoryAction.editCategorySuccess, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(CategoryAction.editCategoryFailed, (state, { response }) => ({
    ...state,
    message: response.message,
  })),

  on(CategoryAction.editCategorySystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
