import { createReducer, on } from "@ngrx/store";
import * as AuthorListAction from "./multiselect-autocomplete.store.action";
import { IBaseState } from "src/app/model/IBaseModel";

export interface State extends IBaseState {
  authorList: any;
  pageNumber: number;
  pageOffset: number;
  deleteStatus: any;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  authorList: [],
  deleteStatus: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(AuthorListAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(AuthorListAction.getAuthorList, (state, { payload }) => ({
    ...state,
  })),

  on(AuthorListAction.getAuthorListSuccess, (state, { response }) => ({
    ...state,
    authorList: response,
  })),

  on(AuthorListAction.getAuthorListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(AuthorListAction.getAuthorListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(AuthorListAction.resetAuthorList, (state) => ({
    ...state,
    pageNumber: 0,
    pageOffset: 0,
    authorList: [],
    deleteStatus: null,
  }))
);
