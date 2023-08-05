import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { CategoryStoreService } from './category-create.store.service';
import * as CategoryAction from './category-create.store.action';
import { CategoryUnionActions } from './category-create.store.action';

@Injectable()
export class CategoryCreateEffects {
  constructor(
    private action: Actions<CategoryAction.CategoryUnionActions>,
    private storeService: CategoryStoreService
  ) {}

  createCategory: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(CategoryAction.createCategory),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.createCategory(action).pipe(
          map((response) => {
            console.log("abcd", response);
            if (response.resultCd === 0) {
              console.log(response);
              return CategoryAction.createCategorySuccess({
                response: response,
              });
            } else {
              return CategoryAction.createCategoryFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(CategoryAction.createCategorySystemFailed({ error: error }));
          })
        );
      })
    )
  );

  createCategorySuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.createCategorySuccess)),
    { dispatch: false }
  );

  createCategoryFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.createCategoryFailed)),
    { dispatch: false }
  );

  createCategorySystemFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryAction.createCategorySystemFailed)),
    { dispatch: false }
  );

  //createCategorySuccess
}
