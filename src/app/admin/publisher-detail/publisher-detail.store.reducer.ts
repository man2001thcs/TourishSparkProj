import { createReducer, on } from '@ngrx/store';
import * as PublisherAction from './publisher-detail.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  publisher: any;
  publisherReturn: any;
}

export const initialState: State = {
  publisher: null,
  resultCd: 0,
  publisherReturn: null
};

export const reducer = createReducer(
  initialState,

  on(PublisherAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(PublisherAction.getPublisher, (state, { payload }) => ({
    ...state,
  })),

  on(PublisherAction.getPublisherSuccess, (state, { response }) => ({
    ...state,
    publisher: response.data,
  })),

  on(PublisherAction.getPublisherFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(PublisherAction.getPublisherSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(PublisherAction.editPublisher, (state, { payload }) => ({
    ...state,
  })),

  on(PublisherAction.editPublisherSuccess, (state, { response }) => ({
    ...state,
    publisherReturn: response,
  })),

  on(PublisherAction.editPublisherFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(PublisherAction.editPublisherSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })), 

  on(PublisherAction.resetPublisher, (state) => ({
    ...state,
    publisher: null,
    publisherReturn: null
  }))
);
