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
import { NotifyDialogComponent } from "src/app/utility/notification/notify-dialog.component";
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
import { Voucher, VoucherParam } from "./voucher-create.component.model";
import * as VoucherActions from "./voucher-create.store.action";
import { State as VoucherState } from "./voucher-create.store.reducer";
import { Store } from "@ngrx/store";
import {
  createVoucher,
  getMessage,
  getSysError,
} from "./voucher-create.store.selector";
import { FailNotifyDialogComponent } from "src/app/utility/notification/fail-notify-dialog.component";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-create",
  templateUrl: "./voucher-create.component.html",
  styleUrls: ["./voucher-create.component.css"],
})
export class VoucherCreateComponent implements OnInit, OnDestroy {
  isEditing: boolean = true;

  voucherParam!: VoucherParam;

  this_announce = "";

  createformGroup_info!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;

  voucherState!: Observable<any>;
  createVoucherState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<VoucherState>,
    private messageService: MessageService,
    private _route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: VoucherParam
  ) {
    this.createVoucherState = this.store.select(createVoucher);

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.createVoucherState.subscribe((state) => {
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

    this.store.dispatch(VoucherActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.createformGroup_info = this.fb.group({
      name: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      discountFloat: [
        0,
        Validators.compose([Validators.required, Validators.max(1)]),
      ],
      discountAmount: [0, Validators.compose([Validators.required])],
      description: "",
    });
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(VoucherActions.resetVoucher());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formReset(): void {
    this.createformGroup_info.setValue({
      name: "",
      description: "",
      discountFloat: 0,
      discountAmount: 0,
    });
  }

  formSubmit_create_info(): void {
    const payload: Voucher = {
      name: this.createformGroup_info.value.name,
      description: this.createformGroup_info.value.description,
      discountFloat: this.createformGroup_info.value.discountFloat,
      discountAmount: this.createformGroup_info.value.discountAmount,
    };

    this.store.dispatch(
      VoucherActions.createVoucher({
        payload: payload,
      })
    );

    console.log(payload);
  }
}
