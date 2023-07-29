import { createReducer, on } from '@ngrx/store';
import * as CategoryListAction from './categoryList_admin.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';


export interface State extends IBaseState {
  categoryList: any;
  pageNumber: 0;
  pageOffset: 0;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  categoryList: [],
  resultCd: 0
};

export const reducer = createReducer(
  initialState,

  on(CategoryListAction.initial, (state) => ({
    ...state,
    initialState
  })),
  
  on(CategoryListAction.getCategoryList, (state, { payload }) => ({
    ...state,
  })),

  on(CategoryListAction.getCategoryListSuccess, (state, { response }) => ({
    ...state,
    categoryList: response.data,
  })),

  on(CategoryListAction.getCategoryListFailed, (state, { response }) => ({
    ...state,
    message: response.message,
  })),

  on(CategoryListAction.getCategoryListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
