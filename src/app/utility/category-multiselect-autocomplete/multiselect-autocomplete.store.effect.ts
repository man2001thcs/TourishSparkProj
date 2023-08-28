import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Observable, of } from "rxjs";
import { catchError, map, mergeMap, switchMap } from "rxjs/operators";
import { MultiSelectCategoryListStoreService } from "./multiselect-autocomplete.store.service";
import * as CategoryListAction from "./multiselect-autocomplete.store.action";
import { CategoryListUnionActions } from "./multiselect-autocomplete.store.action";

@Injectable()
export class CategoryAutoCompleteListEffects {
  constructor(
    private action: Actions<CategoryListAction.CategoryListUnionActions>,
    private storeService: MultiSelectCategoryListStoreService
  ) {}

  getCategoryList: Observable<any> = createEffect(() =>
    this.action.pipe(
      ofType(CategoryListAction.getCategoryList),
      map((action) => action.payload),
      switchMap((action) => {
        return this.storeService.getCategoryList(action).pipe(
          map((response) => {
            if (response.resultCd === 0) {
              return CategoryListAction.getCategoryListSuccess({
                response: response,
              });
            } else {
              return CategoryListAction.getCategoryListFailed({
                response: response,
              });
            }
          }),
          catchError((error) => {
            return of(
              CategoryListAction.getCategoryListSystemFailed({ error: error })
            );
          })
        );
      })
    )
  );

  getCategoryListSuccess: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryListAction.getCategoryListSuccess)),
    { dispatch: false }
  );

  getCategoryListFailed: Observable<any> = createEffect(
    () => this.action.pipe(ofType(CategoryListAction.getCategoryListFailed)),
    { dispatch: false }
  );

  getCategoryListSystemFailed: Observable<any> = createEffect(
    () =>
      this.action.pipe(ofType(CategoryListAction.getCategoryListSystemFailed)),
    { dispatch: false }
  );
  //getCategoryListSuccess
}
