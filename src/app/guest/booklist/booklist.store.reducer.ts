import { createReducer, on } from '@ngrx/store';
import * as BooklistAction from './booklist.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';


export interface State extends IBaseState {
  bookList: any;
  pageNumber: 0;
  pageOffset: 0;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  bookList: [],
  resultCd: 0
};

export const reducer = createReducer(
  initialState,

  on(BooklistAction.initial, (state) => ({
    ...state,
    initialState
  })),
  
  on(BooklistAction.getBooklist, (state, { payload }) => ({
    ...state,
  })),

  on(BooklistAction.getBookListSuccess, (state, { response }) => ({
    ...state,
    bookList: response.books,
  })),

  on(BooklistAction.getBookListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(BooklistAction.getBookListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
