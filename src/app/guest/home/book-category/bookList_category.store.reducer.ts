import { createReducer, on } from "@ngrx/store";
import * as BookListAction from "./bookList_category.store.action";
import { IBaseState } from "src/app/model/IBaseModel";

export interface State extends IBaseState {
  bookList: any;
  pageNumber: number;
  pageOffset: number;
  deleteStatus: any;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  bookList: [],
  deleteStatus: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(BookListAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(BookListAction.getBookList, (state, { payload }) => ({
    ...state,
  })),

  on(BookListAction.getBookListSuccess, (state, { response }) => ({
    ...state,
    bookList: response,
  })),

  on(BookListAction.getBookListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(BookListAction.getBookListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(BookListAction.resetBookList, (state) => ({
    ...state,
    pageNumber: 0,
    pageOffset: 0,
    bookList: [],
    deleteStatus: null,
  }))
);
