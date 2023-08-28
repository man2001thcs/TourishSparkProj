import { createReducer, on } from '@ngrx/store';
import * as VoucherAction from './voucher-create.store.action';
import { IBaseState } from 'src/app/model/IBaseModel';

export interface State extends IBaseState {
  voucher: any;
  createStatus: any
}

export const initialState: State = {
  voucher: null,
  resultCd: 0,
  createStatus: null
};

export const reducer = createReducer(
  initialState,

  on(VoucherAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(VoucherAction.createVoucher, (state, { payload }) => ({
    ...state,
  })),

  on(VoucherAction.createVoucherSuccess, (state, { response }) => ({
    ...state,
    createStatus: response,
  })),

  on(VoucherAction.createVoucherFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(VoucherAction.createVoucherSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(VoucherAction.resetVoucher, (state) => ({
    ...state,
    voucher: null,
    createStatus: null
  }))
);
