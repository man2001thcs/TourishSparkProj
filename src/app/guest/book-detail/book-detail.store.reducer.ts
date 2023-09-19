import { createReducer, on } from '@ngrx/store';
import * as BookAction from './book-detail.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  book: any;
  bookReturn: any;
  imageList: any;
}

export const initialState: State = {
  book: null,
  resultCd: 0,
  imageList: [],
  bookReturn: null
};

export const reducer = createReducer(
  initialState,

  on(BookAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(BookAction.getBook, (state, { payload }) => ({
    ...state,
  })),

  on(BookAction.getBookSuccess, (state, { response }) => ({
    ...state,
    book: response.data,
  })),

  on(BookAction.getBookFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(BookAction.getBookSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(BookAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(BookAction.getImageList, (state, { payload }) => ({
    ...state,
  })),

  on(BookAction.getImageListSuccess, (state, { response }) => ({
    ...state,
    imageList: response,
  })),

  on(BookAction.getImageListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(BookAction.resetBook, (state) => ({
    ...state,
    book: null,
    bookReturn: null
  }))
);
