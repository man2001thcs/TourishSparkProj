import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectVoucherListStoreService } from "./multiselect-autocomplete.store.service";
import * as VoucherListAction from "./multiselect-autocomplete.store.action";
import { VoucherListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class VoucherAutoCompleteListEffects {
  constructor(
    private action: Actions<VoucherListAction.VoucherListUnionActions>,
    private storeService: MultiSelectVoucherListStoreService
  ) {}

  getVoucherList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(VoucherListAction.getVoucherList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getVoucherList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
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
  //getVoucherListSuccess
}
