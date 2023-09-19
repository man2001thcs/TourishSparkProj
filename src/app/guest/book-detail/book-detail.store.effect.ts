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

  
  getImageList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(BookAction.getImageList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getImageList(action).pipe(
          map((response) => {
            console.log(response);
            if (response.resultCd === 0) {
              console.log(response);
              return BookAction.getImageListSuccess({
                response: response,
              });
            } else {
              return BookAction.getImageListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              BookAction.getImageListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getImageListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.getImageListSuccess)),
    { dispatch: false }
  );

  getImageListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(BookAction.getImageListFailed)),
    { dispatch: false }
  );

  getImageListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(BookAction.getImageListSystemFailed)),
    { dispatch: false }
  );
  //editBookSuccess
}
