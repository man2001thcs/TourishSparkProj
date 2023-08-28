import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PublisherStoreService } from './publisher-detail.store.service';
import * as PublisherAction from './publisher-detail.store.action';
import { PublisherUnionActions } from './publisher-detail.store.action';

@Injectable()
export class PublisherEffects {
  constructor(
    private action: Actions<PublisherAction.PublisherUnionActions>,
    private storeService: PublisherStoreService
  ) {}

  getPublisher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(PublisherAction.getPublisher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getPublisher(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return PublisherAction.getPublisherSuccess({
                response: response,
              });
            } else {
              return PublisherAction.getPublisherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(PublisherAction.getPublisherSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getPublisherSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.getPublisherSuccess)),
    { dispatch: false }
  );

  getPublisherFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.getPublisherFailed)),
    { dispatch: false }
  );

  getPublisherSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.getPublisherSystemFailed)),
    { dispatch: false }
  );

  editPublisher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(PublisherAction.editPublisher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editPublisher(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return PublisherAction.editPublisherSuccess({
                response: response,
              });
            } else {
              return PublisherAction.editPublisherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(PublisherAction.editPublisherSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editPublisherSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.editPublisherSuccess)),
    { dispatch: false }
  );

  editPublisherFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.editPublisherFailed)),
    { dispatch: false }
  );

  editPublisherSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.editPublisherSystemFailed)),
    { dispatch: false }
  );

  //editPublisherSuccess
}
