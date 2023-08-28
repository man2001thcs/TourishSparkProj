import { createReducer, on } from '@ngrx/store';
import * as AuthorAction from './author-detail.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  author: any;
  authorReturn: any;
}

export const initialState: State = {
  author: null,
  resultCd: 0,
  authorReturn: null
};

export const reducer = createReducer(
  initialState,

  on(AuthorAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(AuthorAction.getAuthor, (state, { payload }) => ({
    ...state,
  })),

  on(AuthorAction.getAuthorSuccess, (state, { response }) => ({
    ...state,
    author: response.data,
  })),

  on(AuthorAction.getAuthorFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(AuthorAction.getAuthorSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(AuthorAction.editAuthor, (state, { payload }) => ({
    ...state,
  })),

  on(AuthorAction.editAuthorSuccess, (state, { response }) => ({
    ...state,
    authorReturn: response,
  })),

  on(AuthorAction.editAuthorFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(AuthorAction.editAuthorSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })), 

  on(AuthorAction.resetAuthor, (state) => ({
    ...state,
    author: null,
    authorReturn: null
  }))
);
