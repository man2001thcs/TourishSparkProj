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

import { State as MovingListState } from "./multiselect-autocomplete.store.reducer";
import * as MovingListActions from "./multiselect-autocomplete.store.action";
import { Store } from "@ngrx/store";
import {
  getMovingList,
  getMessage,
  getSysError,
} from "./multiselect-autocomplete.store.selector";
import { MessageService } from "../../user_service/message.service";
import { PassengerCar, MovingSchedule } from "src/app/model/baseModel";

import moment from "moment";
import { ThemePalette } from "@angular/material/core";

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: "moving-multiselect-autocomplete",
  templateUrl: "multiselect-autocomplete.component.html",
  styleUrls: ["multiselect-autocomplete.component.css"],
})
export class MovingMultiselectAutocompleteComponent implements OnInit {
  separatorKeysCodes: number[] = [ENTER, COMMA];
  movingCtrl = new FormControl("");
  @ViewChild("picker") movingPicker: any;

  @Output() result = new EventEmitter<{ data: Array<MovingSchedule> }>();

  @Input() data_selected: Array<PassengerCar> = [];
  @Input() key: string = "";

  movingScheduleList: MovingSchedule[] = [];

  movingIdList: string[] = [];
  movingNameList: string[] = [];

  data!: PassengerCar[];
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

  movingType = "PassengerCar";

  color: ThemePalette = "primary";

  public formGroup = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    date2: new FormControl(null, [Validators.required]),
  });

  movingFormGroup!: FormGroup;

  isSubmit = false;

  subscriptions: Subscription[] = [];
  movingListState!: Observable<any>;
  filteredMovings!: Observable<string | null>;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  @ViewChild("movingInput") movingInput!: ElementRef<HTMLInputElement>;

  constructor(
    private store: Store<MovingListState>,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    this.filteredMovings = this.movingCtrl.valueChanges.pipe(debounceTime(400));

    this.movingListState = this.store
      .select(getMovingList)
      .pipe(debounceTime(400));

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.movingFormGroup = this.fb.group({
      driverName: ["", Validators.compose([Validators.required])],

      vehiclePlate: ["", Validators.compose([Validators.required])],
      phoneNumber: ["", Validators.compose([Validators.required])],
      singlePrice: [0, Validators.compose([Validators.required])],

      vehicleType: 1,
      transportId: ["", Validators.compose([Validators.required])],

      startingPlace: ["", Validators.compose([Validators.required])],
      headingPlace: ["", Validators.compose([Validators.required])],

      startDate: ["", Validators.compose([Validators.required])],
      endDate: ["", Validators.compose([Validators.required])],

      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });

    this.subscriptions.push(
      this.filteredMovings.subscribe((state) => {
        // Reset
        this.pageIndex = 0;
        this.newSearch = true;
        this.searchWord = state ?? "";
        this.isLoading = true;
        this.canLoadMore = true;
        this.currentTotal = 0;

        this.store.dispatch(
          MovingListActions.getMovingList({
            payload: {
              search: (state ?? "").toLowerCase(),
              page: 1,
              pageSize: 6,
              movingType: this.movingType,
            },
          })
        );
      })
    );

    this.subscriptions.push(
      this.movingListState.subscribe((state) => {
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
      MovingListActions.getMovingList({
        payload: {
          search: this.searchWord.toLowerCase(),
          page: this.pageIndex + 1,
          pageSize: 6,
          movingType: this.movingType,
        },
      })
    );
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(MovingListActions.resetMovingList());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  ngOnChanges(): void {
    if (this.data_selected !== undefined) {
      this.data_selected.forEach((item: any) => {
        if (item !== undefined) {
          this.movingIdList.push(item.moving.id);
          this.movingNameList.push(item.moving.branchName);
        }
      });
    }
  }

  changeType($event: any) {
    console.log($event.target.value);

    if (parseInt($event.target.value) === 1) {
      this.movingType = "AirPlane";
    } else if (parseInt($event.target.value) === 0) {
      this.movingType = "PassengerCar";
    }

    this.movingFormGroup.controls["vehicleType"].setValue(
      parseInt($event.target.value)
    );

    this.movingIdList = [];
    this.movingNameList = [];
    this.movingFormGroup.controls["branchName"].setValue(
      ""
    );

    this.newSearch = true;

    this.store.dispatch(
      MovingListActions.getMovingList({
        payload: {
          search: this.searchWord.toLowerCase(),
          page: this.pageIndex + 1,
          pageSize: 6,
          movingType: this.movingType,
        },
      })
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || "").trim();

    // Add our moving
    if (value) {
      this.movingNameList.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.movingCtrl.setValue(null);
  }

  remove(moving: string): void {
    const index = this.movingNameList.indexOf(moving);
    if (index >= 0) {
      this.movingNameList.splice(index, 1);
      this.movingIdList.splice(index, 1);
    }
    this.emitAdjustedData();
  }

  emitAdjustedData = (): void => {
    this.result.emit({ data: this.movingScheduleList });
  };

  selected(event: MatAutocompleteSelectedEvent): void {
    this.movingIdList.push(event.option.value.id);
    this.movingNameList.push(event.option.value.branchName);

    this.movingFormGroup.controls["transportId"].setValue(
      event.option.value.id
    );

    this.movingFormGroup.controls["driverName"].setValue(
      event.option.value.branchName
    );
    this.movingFormGroup.controls["vehiclePlate"].setValue(
      event.option.value.headQuarterAddress
    );
    this.movingFormGroup.controls["phoneNumber"].setValue(
      event.option.value.hotlineNumber
    );

    this.movingInput.nativeElement.value = "";
    this.movingCtrl.setValue(null);
  }

  addToSchedule(): void {
    this.isSubmit = true;
    console.log(this.movingFormGroup.value);
    console.log(this.movingFormGroup.valid);
    if (this.movingFormGroup.valid && this.movingFormGroup.dirty) {
      const schedule: MovingSchedule = {
        driverName: this.movingFormGroup.value.driverName,
        vehiclePlate: this.movingFormGroup.value.vehiclePlate,
        phoneNumber: this.movingFormGroup.value.phoneNumber,

        vehicleType: this.movingFormGroup.value.vehicleType,
        transportId: this.movingFormGroup.value.transportId,
        singlePrice: this.movingFormGroup.value.singlePrice,

        startingPlace: this.movingFormGroup.value.startingPlace,
        headingPlace: this.movingFormGroup.value.headingPlace,

        startDate: this.movingFormGroup.value.startDate,
        endDate: this.movingFormGroup.value.endDate,
        description: this.movingFormGroup.value.description,
      };

      this.movingScheduleList = [schedule, ...this.movingScheduleList];

      this.movingScheduleList.sort((a: MovingSchedule, b: MovingSchedule) => {
        return moment(a.startDate).valueOf() - moment(b.startDate).valueOf();
      });

      this.emitAdjustedData();
      this.formReset();
    }
  }

  removeSchedule(id: string): void {
    var index = this.movingScheduleList.findIndex((entity) => entity.id === id);
    if (index > -1) this.movingScheduleList.splice(index, 1);

    this.emitAdjustedData();
  }

  formReset(): void {
    this.movingFormGroup.reset({
      driverName: "",
      description: "",
      vehiclePlate: "",
      phoneNumber: "",
      transportId: "",
      vehicleType: 1,
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
          MovingListActions.getMovingList({
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

  onDisplayAtr(moving: PassengerCar): string {
    return "";
  }

  isChecked(moving: PassengerCar): boolean {
    let movingExist = this.movingScheduleList.find(
      (movingSchedule) => movingSchedule.transportId === moving.id
    );
    if (movingExist) return true;
    return false;
  }

  cancelLoading() {
    this.isLoading = false;
  }
}
