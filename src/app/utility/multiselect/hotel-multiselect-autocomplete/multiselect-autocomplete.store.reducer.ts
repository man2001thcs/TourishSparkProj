import { createReducer, on } from "@ngrx/store";
import * as HotelListAction from "./multiselect-autocomplete.store.action";
import { IBaseState } from "src/app/model/IBaseModel";

export interface State extends IBaseState {
  entityList: any;
  pageNumber: number;
  pageOffset: number;
  deleteStatus: any;
}

export const initialState: State = {
  pageNumber: 0,
  pageOffset: 0,
  entityList: [],
  deleteStatus: null,
  resultCd: 0,
};

export const reducer = createReducer(
  initialState,

  on(HotelListAction.initial, (state) => ({
    ...state,
    initialState,
  })),

  on(HotelListAction.getHotelList, (state, { payload }) => ({
    ...state,
  })),

  on(HotelListAction.getHotelListSuccess, (state, { response }) => ({
    ...state,
    entityList: response,
  })),

  on(HotelListAction.getHotelListFailed, (state, { response }) => ({
    ...state,
    messageCode: response.messageCode,
  })),

  on(HotelListAction.getHotelListSystemFailed, (state, { error }) => ({
    ...state,
    error: error,
  })),

  on(HotelListAction.resetHotelList, (state) => ({
    ...state,
    pageNumber: 0,
    pageOffset: 0,
    entityList: [],
    deleteStatus: null,
  }))
);
