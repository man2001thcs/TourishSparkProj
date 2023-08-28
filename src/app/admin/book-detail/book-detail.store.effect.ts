import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { BookStoreService } from './book-detail.store.service';
import * as BookAction from './book-detail.store.action';
import { BookUnionActions } from './book-detail.store.action';

@Injectable()
export class BookDetailEffects {
  constructor(
    private action: Actions<BookAction.BookUnionActions>,
    private storeService: BookStoreService
  ) {}

  getBook: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(BookAction.getBook),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getBook(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return BookAction.getBookSuccess({
                response: response,
              });
            } else {
              return BookAction.getBookFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(BookAction.getBookSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  getBookSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.getBookSuccess)),
    { dispatch: false }
  );

  getBookFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.getBookFailed)),
    { dispatch: false }
  );

  getBookSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.getBookSystemFailed)),
    { dispatch: false }
  );

  editBook: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(BookAction.editBook),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.editBook(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return BookAction.editBookSuccess({
                response: response,
              });
            } else {
              return BookAction.editBookFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(BookAction.editBookSystemFailed({ error: error }));
          })
        );
      })
    )
  );

  editBookSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.editBookSuccess)),
    { dispatch: false }
  );

  editBookFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.editBookFailed)),
    { dispatch: false }
  );

  editBookSystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.editBookSystemFailed)),
    { dispatch: false }
  );

  //editBookSuccess
}
