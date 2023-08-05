import { createReducer, on } from '@ngrx/store';
import * as CategoryAction from './category-create.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  category: any;
  createStatus: any
}

export const initialState: State = {
  category: null,
  resultCd: 0,
  createStatus: null
};

export const reducer = createReducer(
  initialState,

  on(CategoryAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(CategoryAction.createCategory, (state, { payload }) => ({
    ...state,
  })),

  on(CategoryAction.createCategorySuccess, (state, { response }) => ({
    ...state,
    createStatus: response,
  })),

  on(CategoryAction.createCategoryFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(CategoryAction.createCategorySystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(CategoryAction.resetCategory, (state) => ({
    ...state,
    category: null,
    createStatus: null
  }))
);
