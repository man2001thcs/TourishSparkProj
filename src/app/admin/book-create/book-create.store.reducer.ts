import { createReducer, on } from "@ngrx/store";
import * as AuthorAction from "./book-create.store.action";
import { IBaseState } from "src/app/model/IBaseModel";

export interface State extends IBaseState {
  bookReturn: any;
}

export const initialState: State = {
  bookReturn: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(AuthorAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(AuthorAction.createBook, (state, { payload }) => ({
    ...state,
  })),

  on(AuthorAction.createBookSuccess, (state, { response }) => ({
    ...state,
    bookReturn: response,
  })),

  on(AuthorAction.createBookFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(AuthorAction.createBookSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(AuthorAction.resetBook, (state) => ({
    ...state,
    bookReturn: null,
  }))
);
