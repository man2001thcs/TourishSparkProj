import { createReducer, on } from '@ngrx/store';
import * as MessageAction from './chat.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  messageList: any;
  getStatus: any
}

export const initialState: State = {
  messageList: null,
  resultCd: 0,
  getStatus: null
};

export const reducer = createReducer(
  initialState,

  on(MessageAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(MessageAction.getMessage, (state, { payload }) => ({
    ...state,
  })),

  on(MessageAction.getMessageSuccess, (state, { response }) => ({
    ...state,
    getStatus: response,
  })),

  on(MessageAction.getMessageFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(MessageAction.getMessageSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(MessageAction.resetMessage, (state) => ({
    ...state,
    messageList: null,
    getStatus: null
  }))
);
