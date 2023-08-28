import { createReducer, on } from '@ngrx/store';
import * as VoucherAction from './voucher-detail.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  voucher: any;
  voucherReturn: any;
}

export const initialState: State = {
  voucher: null,
  resultCd: 0,
  voucherReturn: null
};

export const reducer = createReducer(
  initialState,

  on(VoucherAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(VoucherAction.getVoucher, (state, { payload }) => ({
    ...state,
  })),

  on(VoucherAction.getVoucherSuccess, (state, { response }) => ({
    ...state,
    voucher: response.data,
  })),

  on(VoucherAction.getVoucherFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(VoucherAction.getVoucherSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(VoucherAction.editVoucher, (state, { payload }) => ({
    ...state,
  })),

  on(VoucherAction.editVoucherSuccess, (state, { response }) => ({
    ...state,
    voucherReturn: response,
  })),

  on(VoucherAction.editVoucherFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(VoucherAction.editVoucherSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })), 

  on(VoucherAction.resetVoucher, (state) => ({
    ...state,
    voucher: null,
    voucherReturn: null
  }))
);
