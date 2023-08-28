import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { VoucherListStoreService } from "./voucherList_admin.store.service";
import * as VoucherListAction from "./voucherList_admin.store.action";
import { VoucherListUnionActions } from "./voucherList_admin.store.action";

@Injectable()
export class VoucherListEffects {
  constructor(
    private action: Actions<VoucherListAction.VoucherListUnionActions>,
    private storeService: VoucherListStoreService
  ) {}

  getVoucherList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(VoucherListAction.getVoucherList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getVoucherList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return VoucherListAction.getVoucherListSuccess({
                response: response,
              });
            } else {
              return VoucherListAction.getVoucherListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              VoucherListAction.getVoucherListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getVoucherListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherListAction.getVoucherListSuccess)),
    { dispatch: false }
  );

  getVoucherListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherListAction.getVoucherListFailed)),
    { dispatch: false }
  );

  getVoucherListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(VoucherListAction.getVoucherListSystemFailed)),
    { dispatch: false }
  );

  deleteVoucher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(VoucherListAction.deleteVoucher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deleteVoucher(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return VoucherListAction.deleteVoucherSuccess({
                response: response,
              });
            } else {
              return VoucherListAction.deleteVoucherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              VoucherListAction.deleteVoucherSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deleteVoucherListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherListAction.deleteVoucherSuccess)),
    { dispatch: false }
  );

  deleteVoucherListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherListAction.deleteVoucherFailed)),
    { dispatch: false }
  );

  deleteVoucherListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(VoucherListAction.deleteVoucherSystemFailed)),
    { dispatch: false }
  );

  //getVoucherListSuccess
}
