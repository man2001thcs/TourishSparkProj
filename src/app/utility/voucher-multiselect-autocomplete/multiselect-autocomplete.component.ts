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

import { Voucher } from "src/app/admin/book-create/book-create.component.model";

import { State as VoucherListState } from "./multiselect-autocomplete.store.reducer";
import * as VoucherListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import { getMessage, getVoucherList } from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../user_service/message.service";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "voucher-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class VoucherMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  voucherCtrl = new FormControl("");

  @Output() result = new EventEmitter<{ data: Array<string> }>();

  @Input() data_selected!: Array<Voucher>;
  @Input() key: string = "";

  voucherIdList: string[] = [];
  voucherNameList: string[] = [];

  data!: Voucher[];
  length: number = 0;
  pageIndex = 0;
  canLoadMore = true;
  isLoading = false;
  pageSize = 6;
  currentTotal = 0;

  searchWord = "";
  newSearch = true;

  subscriptions: Subscription[] = [];
  voucherListState!: Observable<any>;
  errorMessageState!: Observable<any>;
  filteredVouchers!: Observable<string | null>;

  @ViewChild("voucherInput") voucherInput!: ElementRef<HTMLInputElement>;

  constructor(private messageService: MessageService, private store: Store<VoucherListState>) {
    this.filteredVouchers = this.voucherCtrl.valueChanges.pipe(
      debounceTime(400)
    );

    this.errorMessageState = this.store
    .select(getMessage);

    this.voucherListState = this.store
      .select(getVoucherList)
      .pipe(debounceTime(400));
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filteredVouchers.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          VoucherListActions.getVoucherList({
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
      this.voucherListState.subscribe((state) => {
        if (state) {
          if (state.data)
            this.currentTotal = this.currentTotal + state.data.length;
          if (this.currentTotal >= state.count) this.canLoadMore = false;

          // New search
          if (this.newSearch || this.currentTotal === state.data.length) {
            if (state.data) this.data = state.data;
            this.newSearch = false;
          } else {
            if (state.data.length > 0) {
              console.log(state.data);
              this.data = this.data.concat(state.data);
            }
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

    this.store.dispatch(
      VoucherListActions.getVoucherList({
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
    this.store.dispatch(VoucherListActions.resetVoucherList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.voucherIdList.push(item.voucher.id);
          this.voucherNameList.push(item.voucher.name);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our voucher
    if (value) {
      this.voucherNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.voucherCtrl.setValue(null);
  }

  remove(voucher: string): void {
    const index = this.voucherNameList.indexOf(voucher);
    if (index >= 0) {
      this.voucherNameList.splice(index, 1);
      this.voucherIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.voucherIdList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.voucherIdList.push(event.option.value.id);
    this.voucherNameList.push(event.option.value.name);

    this.voucherInput.nativeElement.value = "";
    this.voucherCtrl.setValue(null);
    this.emitAdjustedData();
  }

  onScroll($event: any) {
    if ($event.reachEnd) {
      if (this.canLoadMore && !this.isLoading) {
        this.isLoading = true;
        this.pageIndex++;
        this.store.dispatch(
          VoucherListActions.getVoucherList({
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

  onDisplayAtr(voucher: Voucher): string {
    if (voucher.discountAmount > 0) {
      return "Ammount: " + voucher.discountAmount;
    } else if (voucher.discountFloat > 0) {
      return "Rate: " + voucher.discountFloat;
    }
    return "";
  }

  isChecked(voucher: Voucher): boolean {
    let voucherExist = this.voucherIdList.find(
      (voucherId) => voucherId === voucher.id
    );
    if (voucherExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
