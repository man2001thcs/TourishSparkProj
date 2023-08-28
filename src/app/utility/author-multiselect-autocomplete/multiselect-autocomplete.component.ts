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

import { Author } from "src/app/admin/book-create/book-create.component.model";

import { State as AuthorListState } from "./multiselect-autocomplete.store.reducer";
import * as AuthorListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import {
  getAuthorList,
  getMessage,
  getSysError,
} from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../user_service/message.service";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "author-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class AuthorMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  authorCtrl = new FormControl("");

  @Output() result = new EventEmitter<{ data: Array<string> }>();

  @Input() data_selected!: Array<Author>;
  @Input() key: string = "";

  authorIdList: string[] = [];
  authorNameList: string[] = [];

  data!: Author[];
  length: number = 0;
  pageIndex = 0;
  canLoadMore = true;
  isLoading = false;
  pageSize = 6;
  currentTotal = 0;

  searchWord = "";
  newSearch = true;

  subscriptions: Subscription[] = [];
  authorListState!: Observable<any>;
  filteredAuthors!: Observable<string | null>;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  @ViewChild("authorInput") authorInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<AuthorListState>,
    private messageService: MessageService
  ) {
    this.filteredAuthors = this.authorCtrl.valueChanges.pipe(debounceTime(400));

    this.authorListState = this.store
      .select(getAuthorList)
      .pipe(debounceTime(400));

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filteredAuthors.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          AuthorListActions.getAuthorList({
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
      this.authorListState.subscribe((state) => {
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

    this.store.dispatch(
      AuthorListActions.getAuthorList({
        payload: {
          search: this.searchWord.toLowerCase(),
          page: this.pageIndex + 1,
          pageSize: 6,
        },
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
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(AuthorListActions.resetAuthorList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.authorIdList.push(item.author.id);
          this.authorNameList.push(item.author.name);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our author
    if (value) {
      this.authorNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.authorCtrl.setValue(null);
  }

  remove(author: string): void {
    const index = this.authorNameList.indexOf(author);
    if (index >= 0) {
      this.authorNameList.splice(index, 1);
      this.authorIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.authorIdList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authorIdList.push(event.option.value.id);
    this.authorNameList.push(event.option.value.name);

    this.authorInput.nativeElement.value = "";
    this.authorCtrl.setValue(null);
    this.emitAdjustedData();
  }

  onScroll($event: any) {
    if ($event.reachEnd) {
      if (this.canLoadMore && !this.isLoading) {
        this.isLoading = true;
        this.pageIndex++;
        this.store.dispatch(
          AuthorListActions.getAuthorList({
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

  onDisplayAtr(author: Author): string {
    return "";
  }

  isChecked(author: Author): boolean {
    let authorExist = this.authorIdList.find(
      (authorId) => authorId === author.id
    );
    if (authorExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
