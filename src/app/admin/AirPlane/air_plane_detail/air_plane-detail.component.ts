import { Response } from "../../../model/response";
import { Component, Inject, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subscription, map } from "rxjs";
import {
  ConfirmDialogComponent,
  DialogData,
} from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { NotifyDialogComponent } from "src/app/utility/notification_admin/notify-dialog.component";
import { MAT_DIALOG_DATA, MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { Book } from "src/app/model/book";
import { AdminService } from "../../service/admin.service";
import { CheckDeactivate } from "../../interface/admin.check_edit";
import { AirPlaneParam } from "./air_plane-detail.component.model";

import * as AirPlaneActions from "./air_plane-detail.store.action";
import { State as AirPlaneState } from "./air_plane-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editAirPlane,
  getAirPlane,
  getMessage,
  getSysError,
} from "./air_plane-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";
import { AirPlane } from "src/app/model/baseModel";

@Component({
  selector: "app-air-plane-detail",
  templateUrl: "./air_plane-detail.component.html",
  styleUrls: ["./air_plane-detail.component.css"],
})
export class AirPlaneDetailComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;
  airPlane: AirPlane = {
    id: "",
    branchName: "",
    hotlineNumber: "",
    supportEmail: "",
    headQuarterAddress: "",
    discountFloat: 0,
    discountAmount: 0,
    description: "",
  };
  airPlaneParam!: AirPlaneParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  airPlaneState!: Observable<any>;
  editAirPlaneState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<AirPlaneState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: AirPlaneParam
  ) {
    this.airPlaneState = this.store.select(getAirPlane);
    this.editAirPlaneState = this.store.select(editAirPlane);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.editformGroup_info = this.fb.group({
      id: [
        this.data.id,
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      branchName: [
        this.airPlane.branchName ?? "",
        Validators.compose([Validators.required]),
      ],
      hotlineNumber: [
        this.airPlane.hotlineNumber ?? "",
        Validators.compose([Validators.required, Validators.minLength(8)]),
      ],
      supportEmail: [
        this.airPlane.supportEmail ?? "",
        Validators.compose([Validators.required]),
      ],
      headQuarterAddress: [
        this.airPlane.headQuarterAddress ?? "",
        Validators.compose([Validators.required]),
      ],
      discountFloat: [
        this.airPlane.discountFloat ?? 0,
        Validators.compose([Validators.required]),
      ],
      discountAmount: [
        this.airPlane.discountAmount ?? 0,
        Validators.compose([Validators.required]),
      ],

      description: this.airPlane.description,
    });

    this.subscriptions.push(
      this.airPlaneState.subscribe((state) => {
        if (state) {
          this.airPlane = state;

          this.editformGroup_info.controls["branchName"].setValue(
            state.branchName
          );
          this.editformGroup_info.controls["hotlineNumber"].setValue(
            state.hotlineNumber
          );
          this.editformGroup_info.controls["supportEmail"].setValue(
            state.supportEmail
          );
          this.editformGroup_info.controls["headQuarterAddress"].setValue(
            state.headQuarterAddress
          );

          this.editformGroup_info.controls["discountFloat"].setValue(
            state.discountFloat
          );

          this.editformGroup_info.controls["discountAmount"].setValue(
            state.discountAmount
          );

          this.editformGroup_info.controls["description"].setValue(
            state.description
          );
        }
      })
    );

    this.subscriptions.push(
      this.editAirPlaneState.subscribe((state) => {
        if (state) {
          this.messageService.openMessageNotifyDialog(state.messageCode);
        }
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
          this.messageService.openFailNotifyDialog(state);
        }
      })
    );

    this.store.dispatch(
      AirPlaneActions.getAirPlane({
        payload: {
          id: this.data.id,
        },
      })
    );

    this.store.dispatch(AirPlaneActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(AirPlaneActions.resetAirPlane());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      branchName: this.airPlane.branchName ?? "",
      hotlineNumber: this.airPlane.hotlineNumber ?? "",
      supportEmail: this.airPlane.supportEmail ?? "",
      headQuarterAddress: this.airPlane.headQuarterAddress ?? "",
      discountFloat: this.airPlane.discountFloat ?? 0,
      discountAmount: this.airPlane.discountAmount ?? 0,
      description: this.airPlane.description,
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    const payload: AirPlane = {
      id: this.data.id,
      branchName: this.editformGroup_info.value.branchName,
      hotlineNumber: this.editformGroup_info.value.hotlineNumber,
      supportEmail: this.editformGroup_info.value.supportEmail,
      headQuarterAddress: this.editformGroup_info.value.headQuarterAddress,
      discountFloat: this.editformGroup_info.value.discountFloat,
      discountAmount: this.editformGroup_info.value.discountAmount,
      description: this.editformGroup_info.value.description,
    };

    this.store.dispatch(
      AirPlaneActions.editAirPlane({
        payload: payload,
      })
    );
  }
}
