import { createReducer, on } from "@ngrx/store";
import * as PublisherListAction from "./multiselect-autocomplete.store.action";
import { IBaseState } from "src/app/model/IBaseModel";

export interface State extends IBaseState {
  publisherList: any;
  pageNumber: number;
  pageOffset: number;
  deleteStatus: any;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  publisherList: [],
  deleteStatus: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(PublisherListAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(PublisherListAction.getPublisherList, (state, { payload }) => ({
    ...state,
  })),

  on(PublisherListAction.getPublisherListSuccess, (state, { response }) => ({
    ...state,
    publisherList: response,
  })),

  on(PublisherListAction.getPublisherListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(PublisherListAction.getPublisherListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(PublisherListAction.resetPublisherList, (state) => ({
    ...state,
    pageNumber: 0,
    pageOffset: 0,
    publisherList: [],
    deleteStatus: null,
  }))
);
