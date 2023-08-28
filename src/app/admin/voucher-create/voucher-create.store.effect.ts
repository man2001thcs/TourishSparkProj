import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { VoucherStoreService } from './voucher-create.store.service';
import * as VoucherAction from './voucher-create.store.action';
import { VoucherUnionActions } from './voucher-create.store.action';

@Injectable()
export class VoucherCreateEffects {
  constructor(
    private action: Actions<VoucherAction.VoucherUnionActions>,
    private storeService: VoucherStoreService
  ) {}

  createVoucher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(VoucherAction.createVoucher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createVoucher(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return VoucherAction.createVoucherSuccess({
                response: response,
              });
            } else {
              return VoucherAction.createVoucherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(VoucherAction.createVoucherSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createVoucherSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.createVoucherSuccess)),
    { dispatch: false }
  );

  createVoucherFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.createVoucherFailed)),
    { dispatch: false }
  );

  createVoucherSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(VoucherAction.createVoucherSystemFailed)),
    { dispatch: false }
  );

  //createVoucherSuccess
}
