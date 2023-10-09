import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { TourishPlanStoreService } from './tourishPlan-create.store.service';
import * as TourishPlanAction from './tourishPlan-create.store.action';
import { TourishPlanUnionActions } from './tourishPlan-create.store.action';

@Injectable()
export class TourishPlanCreateEffects {
  constructor(
    private action: Actions<TourishPlanAction.TourishPlanUnionActions>,
    private storeService: TourishPlanStoreService
  ) {}

  createTourishPlan: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType( TourishPlanAction.createTourishPlan),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createTourishPlan(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return  TourishPlanAction.createTourishPlanSuccess({
                response: response,
              });
            } else {
              return  TourishPlanAction.createTourishPlanFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of( TourishPlanAction.createTourishPlanSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createTourishPlanSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType( TourishPlanAction.createTourishPlanSuccess)),
    { dispatch: false }
  );

  createTourishPlanFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType( TourishPlanAction.createTourishPlanFailed)),
    { dispatch: false }
  );

  createTourishPlanSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType( TourishPlanAction.createTourishPlanSystemFailed)),
    { dispatch: false }
  );

  //editAuthorSuccess
}
