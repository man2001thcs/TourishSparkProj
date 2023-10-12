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
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatAutocompleteSelectedEvent } from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable, Subscription, of, timer } from "rxjs";
import { debounceTime } from "rxjs/operators";

import { State as StayingListState } from "./multiselect-autocomplete.store.reducer";
import * as StayingListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import {
  getStayingList,
  getMessage,
  getSysError,
} from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../../user_service/message.service";
import { Hotel, StayingSchedule } from "src/app/model/baseModel";
import * as moment from "moment";
import { ThemePalette } from "@angular/material/core";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "staying-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class StayingMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  stayingCtrl = new FormControl("");
  @ViewChild("picker") stayingPicker: any;

  @Output() result = new EventEmitter<{ data: Array<string> }>();

  @Input() data_selected: Array<Hotel> = [];
  @Input() key: string = "";

  stayingScheduleList: StayingSchedule[] = [];

  stayingIdList: string[] = [];
  stayingNameList: string[] = [];

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

  color: ThemePalette = "primary";

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required]),
  });

  movingFormGroup!: FormGroup;

  subscriptions: Subscription[] = [];
  stayingListState!: Observable<any>;
  filteredStayings!: Observable<string | null>;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  @ViewChild("stayingInput") stayingInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<StayingListState>,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.filteredStayings = this.stayingCtrl.valueChanges.pipe(
      debounceTime(400)
    );

    this.stayingListState = this.store
      .select(getStayingList)
      .pipe(debounceTime(400));

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.movingFormGroup = this.fb.group({
      placeName: ["", Validators.compose([Validators.required])],

      address: ["", Validators.compose([Validators.required])],
      supportNumber: ["", Validators.compose([Validators.required])],
      singlePrice: [0, Validators.compose([Validators.required])],

      restHouseType: 1,
      restHouseBranchId: ["", Validators.compose([Validators.required])],

      startDate: ["", Validators.compose([Validators.required])],
      endDate: ["", Validators.compose([Validators.required])],

      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });

    this.subscriptions.push(
      this.filteredStayings.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          StayingListActions.getStayingList({
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
      this.stayingListState.subscribe((state) => {
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
      StayingListActions.getStayingList({
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
    this.store.dispatch(StayingListActions.resetStayingList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.stayingIdList.push(item.staying.id);
          this.stayingNameList.push(item.staying.placeBranch);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our staying
    if (value) {
      this.stayingNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.stayingCtrl.setValue(null);
  }

  remove(staying: string): void {
    const index = this.stayingNameList.indexOf(staying);
    if (index >= 0) {
      this.stayingNameList.splice(index, 1);
      this.stayingIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.stayingIdList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.stayingIdList.push(event.option.value.id);
    this.stayingNameList.push(event.option.value.placeBranch);

    this.movingFormGroup.controls["id"].setValue(
      event.option.value.id
    );

    this.stayingInput.nativeElement.value = "";
    this.stayingCtrl.setValue(null);
    this.emitAdjustedData();
  }

  addToSchedule(): void {
    const schedule: StayingSchedule = {
      placeName: this.stayingNameList[0],
      address: this.movingFormGroup.value.address,
      supportNumber: this.movingFormGroup.value.supportNumber,
      restHouseBranchId: this.movingFormGroup.value.restHouseBranchId,
      restHouseType: this.movingFormGroup.value.restHouseType,
      singlePrice: this.movingFormGroup.value.singlePrice,
      startDate: this.movingFormGroup.value.startDate,
      endDate: this.movingFormGroup.value.endDate,
      description: this.movingFormGroup.value.description,
    };

    this.stayingScheduleList = [schedule, ...this.stayingScheduleList];

    this.formReset();
  }

  formReset(): void {
    this.movingFormGroup.setValue({
      placeName: "",
      description: "",
      address: "",
      supportNumber: "",
      restHouseBranchId: "",
      restHouseType: 1,
      singlePrice: 0,
      startDate: "",
      endDate: "",
    });
  }

  onScroll($event: any) {
    if ($event.reachEnd) {
      if (this.canLoadMore && !this.isLoading) {
        this.isLoading = true;
        this.pageIndex++;
        this.store.dispatch(
          StayingListActions.getStayingList({
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

  onDisplayAtr(staying: Hotel): string {
    return "";
  }

  isChecked(staying: Hotel): boolean {
    let stayingExist = this.stayingIdList.find(
      (stayingId) => stayingId === staying.id
    );
    if (stayingExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
