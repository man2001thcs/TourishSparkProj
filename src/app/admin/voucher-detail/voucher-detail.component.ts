import { Response } from "../../model/response";
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
import { Author } from "src/app/model/author";
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
import { Voucher, VoucherParam } from "./voucher-detail.component.model";
import * as VoucherActions from "./voucher-detail.store.action";
import { State as VoucherState } from "./voucher-detail.store.reducer";
import { Store } from "@ngrx/store";
import { editVoucher, getVoucher, getMessage, getSysError } from "./voucher-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./voucher-detail.component.html",
  styleUrls: ["./voucher-detail.component.css"],
})
export class VoucherDetailComponent
  implements OnInit, OnDestroy
{
  isEditing: boolean = true;
  voucher: Voucher = {
    id: "",
    name: "",
    discountFloat: 0,
    discountAmount: 0,
    description: "",
  };
  voucherParam!: VoucherParam;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  voucherState!: Observable<any>;
  editVoucherState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<VoucherState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: VoucherParam
  ) {
    this.voucherState = this.store.select(getVoucher);
    this.editVoucherState = this.store.select(editVoucher);
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
      name: [
        this.voucher.name ?? "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      discountFloat: [
        this.voucher.discountFloat ?? 0,
        Validators.compose([Validators.required, Validators.max(1)]),
      ],
      discountAmount: [ this.voucher.discountAmount ?? 0, Validators.compose([Validators.required])],
      description: this.voucher.description,
    });

    this.subscriptions.push(
      this.voucherState.subscribe((state) => {
        if (state) {
          this.voucher = state;
          this.editformGroup_info.controls["name"].setValue(state.name);
          this.editformGroup_info.controls["discountFloat"].setValue(state.discountFloat);
          this.editformGroup_info.controls["discountAmount"].setValue(state.discountAmount);
          this.editformGroup_info.controls["description"].setValue(
            state.description
          );
        }
      })
    );

    this.subscriptions.push(
      this.editVoucherState.subscribe((state) => {
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
          this.messageService.openSystemFailNotifyDialog(state);  
        }
      })
    );

    this.store.dispatch(
      VoucherActions.getVoucher({
        payload: {
          id: this.data.id,
        },
      })
    );

    this.store.dispatch(VoucherActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(VoucherActions.resetVoucher());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.editformGroup_info.setValue({
      name: this.voucher.name ?? "",
      description: this.voucher.description ?? "",
    });
  }

  formSubmit(): void {
    console.log(this.editformGroup_info.value);
  }

  formSubmit_edit_info(): void {
    const payload: Voucher = {
      id: this.data.id,
      name: this.editformGroup_info.value.name,
      description: this.editformGroup_info.value.description,
      discountFloat: this.editformGroup_info.value.discountFloat,
      discountAmount: this.editformGroup_info.value.discountAmount,
    };

    this.store.dispatch(
      VoucherActions.editVoucher({
        payload: payload,
      })
    );
  }
}
