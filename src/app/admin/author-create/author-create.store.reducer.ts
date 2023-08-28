import { createReducer, on } from '@ngrx/store';
import * as AuthorAction from './author-create.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  author: any;
  createStatus: any
}

export const initialState: State = {
  author: null,
  resultCd: 0,
  createStatus: null
};

export const reducer = createReducer(
  initialState,

  on(AuthorAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(AuthorAction.createAuthor, (state, { payload }) => ({
    ...state,
  })),

  on(AuthorAction.createAuthorSuccess, (state, { response }) => ({
    ...state,
    createStatus: response,
  })),

  on(AuthorAction.createAuthorFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(AuthorAction.createAuthorSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(AuthorAction.resetAuthor, (state) => ({
    ...state,
    author: null,
    createStatus: null
  }))
);
