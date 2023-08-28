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

import { Publisher } from "src/app/admin/book-create/book-create.component.model";

import { State as PublisherListState } from "./multiselect-autocomplete.store.reducer";
import * as PublisherListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import { getMessage, getPublisherList, getSysError } from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../user_service/message.service";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "publisher-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class PublisherMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  publisherCtrl = new FormControl("");

  @Output() result = new EventEmitter<{ data: Array<string> }>();

  @Input() data_selected!: Array<Publisher>;
  @Input() key: string = "";

  publisherIdList: string[] = [];
  publisherNameList: string[] = [];

  data!: Publisher[];
  length: number = 0;
  pageIndex = 0;
  canLoadMore = true;
  isLoading = false;
  pageSize = 6;
  currentTotal = 0;

  searchWord = "";
  newSearch = true;

  subscriptions: Subscription[] = [];
  publisherListState!: Observable<any>;
  filteredPublishers!: Observable<string | null>;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  @ViewChild("publisherInput") publisherInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<PublisherListState>,
    private messageService: MessageService
  ) {
    this.filteredPublishers = this.publisherCtrl.valueChanges.pipe(
      debounceTime(400)
    );

    this.publisherListState = this.store
      .select(getPublisherList)
      .pipe(debounceTime(400));

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filteredPublishers.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          PublisherListActions.getPublisherList({
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
      this.publisherListState.subscribe((state) => {
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
      PublisherListActions.getPublisherList({
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
    this.store.dispatch(PublisherListActions.resetPublisherList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.publisherIdList.push(item.id);
          this.publisherNameList.push(item.publisherName);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our publisher
    if (value) {
      this.publisherNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.publisherCtrl.setValue(null);
  }

  remove(publisher: string): void {
    const index = this.publisherNameList.indexOf(publisher);
    if (index >= 0) {
      this.publisherNameList.splice(index, 1);
      this.publisherIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.publisherIdList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.publisherIdList = [];
    this.publisherNameList = [];

    this.publisherIdList.push(event.option.value.id);
    this.publisherNameList.push(event.option.value.publisherName);

    this.publisherInput.nativeElement.value = "";
    this.publisherCtrl.setValue(null);
    this.emitAdjustedData();
  }

  onScroll($event: any) {
    if ($event.reachEnd) {
      if (this.canLoadMore && !this.isLoading) {
        this.isLoading = true;
        this.pageIndex++;
        this.store.dispatch(
          PublisherListActions.getPublisherList({
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

  onDisplayAtr(publisher: Publisher): string {
    return "";
  }

  isChecked(publisher: Publisher): boolean {
    let publisherExist = this.publisherIdList.find(
      (publisherId) => publisherId === publisher.id
    );
    if (publisherExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
