import { createReducer, on } from "@ngrx/store";
import * as CategoryListAction from "./multiselect-autocomplete.store.action";
import { IBaseState } from "src/app/model/IBaseModel";

export interface State extends IBaseState {
  categoryList: any;
  pageNumber: number;
  pageOffset: number;
  deleteStatus: any;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  categoryList: [],
  deleteStatus: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(CategoryListAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(CategoryListAction.getCategoryList, (state, { payload }) => ({
    ...state,
  })),

  on(CategoryListAction.getCategoryListSuccess, (state, { response }) => ({
    ...state,
    categoryList: response,
  })),

  on(CategoryListAction.getCategoryListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(CategoryListAction.getCategoryListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(CategoryListAction.resetCategoryList, (state) => ({
    ...state,
    pageNumber: 0,
    pageOffset: 0,
    categoryList: [],
    deleteStatus: null,
  }))
);
