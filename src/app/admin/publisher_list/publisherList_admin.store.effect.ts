import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { PublisherListStoreService } from "./publisherList_admin.store.service";
import * as PublisherListAction from "./publisherList_admin.store.action";
import { PublisherListUnionActions } from "./publisherList_admin.store.action";

@Injectable()
export class PublisherListEffects {
  constructor(
    private action: Actions<PublisherListAction.PublisherListUnionActions>,
    private storeService: PublisherListStoreService
  ) {}

  getPublisherList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(PublisherListAction.getPublisherList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getPublisherList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return PublisherListAction.getPublisherListSuccess({
                response: response,
              });
            } else {
              return PublisherListAction.getPublisherListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              PublisherListAction.getPublisherListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getPublisherListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherListAction.getPublisherListSuccess)),
    { dispatch: false }
  );

  getPublisherListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherListAction.getPublisherListFailed)),
    { dispatch: false }
  );

  getPublisherListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(PublisherListAction.getPublisherListSystemFailed)),
    { dispatch: false }
  );

  deletePublisher: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(PublisherListAction.deletePublisher),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.deletePublisher(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return PublisherListAction.deletePublisherSuccess({
                response: response,
              });
            } else {
              return PublisherListAction.deletePublisherFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              PublisherListAction.deletePublisherSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  deletePublisherListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherListAction.deletePublisherSuccess)),
    { dispatch: false }
  );

  deletePublisherListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(PublisherListAction.deletePublisherFailed)),
    { dispatch: false }
  );

  deletePublisherListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(PublisherListAction.deletePublisherSystemFailed)),
    { dispatch: false }
  );

  //getPublisherListSuccess
}
