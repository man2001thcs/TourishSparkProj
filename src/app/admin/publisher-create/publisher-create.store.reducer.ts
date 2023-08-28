import { createReducer, on } from '@ngrx/store';
import * as PublisherAction from './publisher-create.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  publisher: any;
  createStatus: any
}

export const initialState: State = {
  publisher: null,
  resultCd: 0,
  createStatus: null
};

export const reducer = createReducer(
  initialState,

  on(PublisherAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(PublisherAction.createPublisher, (state, { payload }) => ({
    ...state,
  })),

  on(PublisherAction.createPublisherSuccess, (state, { response }) => ({
    ...state,
    createStatus: response,
  })),

  on(PublisherAction.createPublisherFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(PublisherAction.createPublisherSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(PublisherAction.resetPublisher, (state) => ({
    ...state,
    publisher: null,
    createStatus: null
  }))
);
