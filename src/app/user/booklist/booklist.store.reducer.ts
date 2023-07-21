import { createReducer, on } from '@ngrx/store';
import * as BooklistAction from './booklist.store.action';
import { IBaseState } from './booklist.component.model';

export interface State extends IBaseState {
  bookList: any;
  pageNumber: 0;
  pageOffset: 0;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  bookList: [],
};

export const reducer = createReducer(
  initialState,
  
  on(BooklistAction.getBooklist, (state, { payload }) => ({
    ...state,
  })),

  on(BooklistAction.getBookListSuccess, (state, { response }) => ({
    ...state,
    booklist: response.booklist,
  })),

  on(BooklistAction.getBookListFailed, (state, { response }) => ({
    ...state,
    message: response.message,
  })),

  on(BooklistAction.getBookListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  }))
);
