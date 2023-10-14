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

import { State as EatingListState } from "./multiselect-autocomplete.store.reducer";
import * as EatingListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import {
  getEatingList,
  getMessage,
  getSysError,
} from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../../user_service/message.service";
import { Restaurant, EatSchedule } from "src/app/model/baseModel";

import moment from "moment";
import { ThemePalette } from "@angular/material/core";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "eating-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class EatingMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  eatingCtrl = new FormControl("");
  @ViewChild("picker") eatingPicker: any;

  @Output() result = new EventEmitter<{ data: Array<EatSchedule> }>();

  @Input() data_selected: Array<Restaurant> = [];
  @Input() key: string = "";

  eatingScheduleList: EatSchedule[] = [];

  eatingIdList: string[] = [];
  eatingNameList: string[] = [];

  data!: Restaurant[];
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

  eatingType = "Restaurant";

  color: ThemePalette = "primary";

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required]),
  });

  eatingFormGroup!: FormGroup;

  isSubmit = false;

  subscriptions: Subscription[] = [];
  eatingListState!: Observable<any>;
  filteredEatings!: Observable<string | null>;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  @ViewChild("eatingInput") eatingInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<EatingListState>,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.filteredEatings = this.eatingCtrl.valueChanges.pipe(
      debounceTime(400)
    );

    this.eatingListState = this.store
      .select(getEatingList)
      .pipe(debounceTime(400));

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.eatingFormGroup = this.fb.group({
      placeName: ["", Validators.compose([Validators.required])],

      address: ["", Validators.compose([Validators.required])],
      supportNumber: ["", Validators.compose([Validators.required])],
      singlePrice: [0, Validators.compose([Validators.required])],

      restHouseType: 1,
      restaurantId: ["", Validators.compose([Validators.required])],

      startDate: ["", Validators.compose([Validators.required])],
      endDate: ["", Validators.compose([Validators.required])],

      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });

    this.subscriptions.push(
      this.filteredEatings.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          EatingListActions.getEatingList({
            payload: {
              search: (state ?? "").toLowerCase(),
              page: 1,
              pageSize: 6,
              eatingType: this.eatingType,
            },
          })
        );
      })
    );

    this.subscriptions.push(
      this.eatingListState.subscribe((state) => {
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
      EatingListActions.getEatingList({
        payload: {
          search: this.searchWord.toLowerCase(),
          page: this.pageIndex + 1,
          pageSize: 6,
          eatingType: this.eatingType,
        },
      })
    );
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(EatingListActions.resetEatingList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.eatingIdList.push(item.eating.id);
          this.eatingNameList.push(item.eating.placeBranch);
        }
      });
    }
  }

  changeType($event: any) {
    console.log($event.target.value);

    if (parseInt($event.target.value) === 1) {
      this.eatingType = "Restaurant";
    }

    this.newSearch = true;

    this.store.dispatch(
      EatingListActions.getEatingList({
        payload: {
          search: this.searchWord.toLowerCase(),
          page: this.pageIndex + 1,
          pageSize: 6,
          eatingType: this.eatingType,
        },
      })
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our eating
    if (value) {
      this.eatingNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.eatingCtrl.setValue(null);
  }

  remove(eating: string): void {
    const index = this.eatingNameList.indexOf(eating);
    if (index >= 0) {
      this.eatingNameList.splice(index, 1);
      this.eatingIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.eatingScheduleList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.eatingIdList.push(event.option.value.id);
    this.eatingNameList.push(event.option.value.placeBranch);

    this.eatingFormGroup.controls["restaurantId"].setValue(event.option.value.id);
    
    this.eatingFormGroup.controls["placeName"].setValue(
      event.option.value.placeBranch
    );
    this.eatingFormGroup.controls["address"].setValue(
      event.option.value.headQuarterAddress
    );
    this.eatingFormGroup.controls["supportNumber"].setValue(
      event.option.value.hotlineNumber
    );

    this.eatingInput.nativeElement.value = "";
    this.eatingCtrl.setValue(null);
  }

  addToSchedule(): void {
    this.isSubmit = true;
    console.log(this.eatingFormGroup.value);
    console.log(this.eatingFormGroup.valid);
    if (this.eatingFormGroup.valid && this.eatingFormGroup.dirty) {
      const schedule: EatSchedule = {
        placeName: this.eatingFormGroup.value.placeName,
        address: this.eatingFormGroup.value.address,
        supportNumber: this.eatingFormGroup.value.supportNumber,
        restaurantId: this.eatingFormGroup.value.restaurantId,
        singlePrice: this.eatingFormGroup.value.singlePrice,
        startDate: this.eatingFormGroup.value.startDate,
        endDate: this.eatingFormGroup.value.endDate,
        description: this.eatingFormGroup.value.description,
      };

      this.eatingScheduleList = [schedule, ...this.eatingScheduleList];

      this.eatingScheduleList.sort(
        (a: EatSchedule, b: EatSchedule) => {
          return moment(a.startDate).valueOf() - moment(b.startDate).valueOf();
        }
      );

      this.emitAdjustedData();
      this.formReset();
    }
  }

  removeSchedule(id: string): void {
    var index = this.eatingScheduleList.findIndex(
      (entity) => entity.id === id
    );
    if (index > -1) this.eatingScheduleList.splice(index, 1);

    this.emitAdjustedData();
  }

  formReset(): void {
    this.eatingFormGroup.reset({
      placeName: "",
      description: "",
      address: "",
      supportNumber: "",
      restaurantId: "",
      restHouseType: 1,
      singlePrice: 0,
      startDate: "",
      endDate: "",
    });

    this.isSubmit = false;
  }

  onScroll($event: any) {
    if ($event.reachEnd) {
      if (this.canLoadMore && !this.isLoading) {
        this.isLoading = true;
        this.pageIndex++;
        this.store.dispatch(
          EatingListActions.getEatingList({
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

  onDisplayAtr(eating: Restaurant): string {
    return "";
  }

  isChecked(eating: Restaurant): boolean {
    let eatingExist = this.eatingScheduleList.find(
      eatingSchedule => eatingSchedule.restaurantId === eating.id
    );
    if (eatingExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
