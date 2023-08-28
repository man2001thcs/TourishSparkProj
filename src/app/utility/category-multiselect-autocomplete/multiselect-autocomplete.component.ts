import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {
  Component,
  ElementRef,
  ViewChild,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, Subscription, of, timer } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { Category } from "src/app/admin/book-create/book-create.component.model";

import { State as CategoryListState } from "./multiselect-autocomplete.store.reducer";
import * as CategoryListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import {
  getCategoryList,
  getMessage,
  getSysError,
} from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../user_service/message.service";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "category-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class CategoryMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  categoryCtrl = new FormControl("");

  @Output() result = new EventEmitter<{ data: Array<string> }>();

  @Input() data_selected!: Array<Category>;
  @Input() key: string = "";

  categoryIdList: string[] = [];
  categoryNameList: string[] = [];

  data!: Category[];
  length: number = 0;
  pageIndex = 0;
  canLoadMore = true;
  isLoading = false;
  pageSize = 6;
  currentTotal = 0;

  searchWord = "";
  newSearch = true;

  subscriptions: Subscription[] = [];
  categoryListState!: Observable<any>;
  filteredCategorys!: Observable<string | null>;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  @ViewChild("categoryInput") categoryInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<CategoryListState>,
    private messageService: MessageService
  ) {
    this.filteredCategorys = this.categoryCtrl.valueChanges.pipe(
      debounceTime(400)
    );

    this.categoryListState = this.store
      .select(getCategoryList)
      .pipe(debounceTime(400));

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filteredCategorys.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          CategoryListActions.getCategoryList({
            payload: {
              search: (state ?? "").toLowerCase(),
              page: 1,
              pageSize: 6,
            },
          })
        );
      })
    );

    this.subscriptions.push(
      this.categoryListState.subscribe((state) => {
        if (state) {
          if (state.data)
            this.currentTotal = this.currentTotal + state.data.length;
          if (this.currentTotal >= state.count) this.canLoadMore = false;

          // New search
          if (this.newSearch || this.currentTotal === state.data.length) {
            if (state.data) this.data = state.data;
            this.newSearch = false;
          } else {
            if (state.data) this.data = this.data.concat(state.data);
          }

          this.length = state.count;
        }

        this.cancelLoading();
      })
    );

    this.subscriptions.push(
      this.errorMessageState.subscribe((state) => {
        if (state) {
          this.messageService.openMessageNotifyDialog(state);
        }
      })
    );

    this.subscriptions.push(
      this.errorSystemState.subscribe((state) => {
        if (state) {
          this.messageService.openSystemFailNotifyDialog(state);
        }
      })
    );

    this.store.dispatch(
      CategoryListActions.getCategoryList({
        payload: {
          search: this.searchWord.toLowerCase(),
          page: this.pageIndex + 1,
          pageSize: 6,
        },
      })
    );
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(CategoryListActions.resetCategoryList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.categoryIdList.push(item.category.id);
          this.categoryNameList.push(item.category.name);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our category
    if (value) {
      this.categoryNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.categoryCtrl.setValue(null);
  }

  remove(category: string): void {
    const index = this.categoryNameList.indexOf(category);
    if (index >= 0) {
      this.categoryNameList.splice(index, 1);
      this.categoryIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.categoryIdList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categoryIdList.push(event.option.value.id);
    this.categoryNameList.push(event.option.value.name);

    this.categoryInput.nativeElement.value = "";
    this.categoryCtrl.setValue(null);
    this.emitAdjustedData();
  }

  onScroll($event: any) {
    if ($event.reachEnd) {
      if (this.canLoadMore && !this.isLoading) {
        this.isLoading = true;
        this.pageIndex++;
        this.store.dispatch(
          CategoryListActions.getCategoryList({
            payload: {
              search: this.searchWord.toLowerCase(),
              page: this.pageIndex + 1,
              pageSize: 6,
            },
          })
        );
      }
    }
  }

  onDisplayAtr(category: Category): string {
    return "";
  }

  isChecked(category: Category): boolean {
    let categoryExist = this.categoryIdList.find(
      (categoryId) => categoryId === category.id
    );
    if (categoryExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
