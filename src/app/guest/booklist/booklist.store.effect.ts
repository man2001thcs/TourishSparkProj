import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BooklistStoreService } from './booklist.store.service';
import * as BooklistAction from './booklist.store.action';
import { BookListUnionActions } from './booklist.store.action';

@Injectable()
export class BookListEffects {
  constructor(
    private action: Actions<BooklistAction.BookListUnionActions>,
    private storeService: BooklistStoreService
  ) {}

  getBookList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(BooklistAction.getBooklist),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getBookList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return BooklistAction.getBookListSuccess({
                response: response,
              });
            } else {
              return BooklistAction.getBookListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(BooklistAction.getBookListSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getBookListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BooklistAction.getBookListSuccess)),
    { dispatch: false }
  );

  getBookListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BooklistAction.getBookListFailed)),
    { dispatch: false }
  );

  getBookListSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BooklistAction.getBookListSystemFailed)),
    { dispatch: false }
  );

  //getBookListSuccess
}
