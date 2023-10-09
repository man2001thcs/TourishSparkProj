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
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, Subscription, of, timer } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { State as HotelListState } from "./multiselect-autocomplete.store.reducer";
import * as HotelListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import {
  getHotelList,
  getMessage,
  getSysError,
} from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../../user_service/message.service";
import { Hotel } from "src/app/model/baseModel";
import * as moment from 'moment';
import { ThemePalette } from "@angular/material/core";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "entity-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class HotelMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  entityCtrl = new FormControl("");
  @ViewChild('picker') picker: any;
  
  @Output() result = new EventEmitter<{ data: Array<string> }>();

  @Input() data_selected!: Array<Hotel>;
  @Input() key: string = "";

  entityIdList: string[] = [];
  entityNameList: string[] = [];

  data!: Hotel[];
  length: number = 0;
  pageIndex = 0;
  canLoadMore = true;
  isLoading = false;
  pageSize = 6;
  currentTotal = 0;

  searchWord = "";
  newSearch = true;


   showSpinners = true;
  showSeconds = false;
  touchUi = false;
  enableMeridian = false;
 
  color: ThemePalette = 'primary';

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required])
  })
  public dateStartControl = new FormControl(new Date());
  public dateEndControl = new FormControl(new Date());

  subscriptions: Subscription[] = [];
  entityListState!: Observable<any>;
  filteredHotels!: Observable<string | null>;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  @ViewChild("entityInput") entityInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<HotelListState>,
    private messageService: MessageService
  ) {
    this.filteredHotels = this.entityCtrl.valueChanges.pipe(
      debounceTime(400)
    );

    this.entityListState = this.store
      .select(getHotelList)
      .pipe(debounceTime(400));

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.filteredHotels.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          HotelListActions.getHotelList({
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
      this.entityListState.subscribe((state) => {
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
      HotelListActions.getHotelList({
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
    this.store.dispatch(HotelListActions.resetHotelList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.entityIdList.push(item.entity.id);
          this.entityNameList.push(item.entity.name);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our entity
    if (value) {
      this.entityNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.entityCtrl.setValue(null);
  }

  remove(entity: string): void {
    const index = this.entityNameList.indexOf(entity);
    if (index >= 0) {
      this.entityNameList.splice(index, 1);
      this.entityIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.entityIdList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.entityIdList.push(event.option.value.id);
    this.entityNameList.push(event.option.value.name);

    this.entityInput.nativeElement.value = "";
    this.entityCtrl.setValue(null);
    this.emitAdjustedData();
  }

  onScroll($event: any) {
    if ($event.reachEnd) {
      if (this.canLoadMore && !this.isLoading) {
        this.isLoading = true;
        this.pageIndex++;
        this.store.dispatch(
          HotelListActions.getHotelList({
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

  onDisplayAtr(entity: Hotel): string {
    return "";
  }

  isChecked(entity: Hotel): boolean {
    let entityExist = this.entityIdList.find(
      (entityId) => entityId === entity.id
    );
    if (entityExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
