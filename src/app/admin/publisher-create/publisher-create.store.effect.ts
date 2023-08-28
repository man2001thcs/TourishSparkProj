import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { PublisherStoreService } from './publisher-create.store.service';
import * as PublisherAction from './publisher-create.store.action';
import { PublisherUnionActions } from './publisher-create.store.action';

@Injectable()
export class PublisherCreateEffects {
  constructor(
    private action: Actions<PublisherAction.PublisherUnionActions>,
    private storeService: PublisherStoreService
  ) {}

  createPublisher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(PublisherAction.createPublisher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createPublisher(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return PublisherAction.createPublisherSuccess({
                response: response,
              });
            } else {
              return PublisherAction.createPublisherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(PublisherAction.createPublisherSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createPublisherSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.createPublisherSuccess)),
    { dispatch: false }
  );

  createPublisherFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.createPublisherFailed)),
    { dispatch: false }
  );

  createPublisherSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherAction.createPublisherSystemFailed)),
    { dispatch: false }
  );

  //createPublisherSuccess
}
