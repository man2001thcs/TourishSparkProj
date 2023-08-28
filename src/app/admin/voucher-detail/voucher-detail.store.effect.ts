import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { VoucherStoreService } from './voucher-detail.store.service';
import * as VoucherAction from './voucher-detail.store.action';
import { VoucherUnionActions } from './voucher-detail.store.action';

@Injectable()
export class VoucherEffects {
  constructor(
    private action: Actions<VoucherAction.VoucherUnionActions>,
    private storeService: VoucherStoreService
  ) {}

  getVoucher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(VoucherAction.getVoucher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getVoucher(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return VoucherAction.getVoucherSuccess({
                response: response,
              });
            } else {
              return VoucherAction.getVoucherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(VoucherAction.getVoucherSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getVoucherSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.getVoucherSuccess)),
    { dispatch: false }
  );

  getVoucherFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.getVoucherFailed)),
    { dispatch: false }
  );

  getVoucherSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.getVoucherSystemFailed)),
    { dispatch: false }
  );

  editVoucher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(VoucherAction.editVoucher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editVoucher(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return VoucherAction.editVoucherSuccess({
                response: response,
              });
            } else {
              return VoucherAction.editVoucherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(VoucherAction.editVoucherSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editVoucherSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.editVoucherSuccess)),
    { dispatch: false }
  );

  editVoucherFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.editVoucherFailed)),
    { dispatch: false }
  );

  editVoucherSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.editVoucherSystemFailed)),
    { dispatch: false }
  );

  //editVoucherSuccess
}
