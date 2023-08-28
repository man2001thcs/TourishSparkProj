import { createReducer, on } from "@ngrx/store";
import * as VoucherListAction from "./multiselect-autocomplete.store.action";
import { IBaseState } from "src/app/model/IBaseModel";

export interface State extends IBaseState {
  voucherList: any;
  pageNumber: number;
  pageOffset: number;
  deleteStatus: any;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  voucherList: [],
  deleteStatus: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(VoucherListAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(VoucherListAction.getVoucherList, (state, { payload }) => ({
    ...state,
  })),

  on(VoucherListAction.getVoucherListSuccess, (state, { response }) => ({
    ...state,
    voucherList: response,
  })),

  on(VoucherListAction.getVoucherListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(VoucherListAction.getVoucherListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(VoucherListAction.resetVoucherList, (state) => ({
    ...state,
    pageNumber: 0,
    pageOffset: 0,
    voucherList: [],
    deleteStatus: null,
  }))
);
