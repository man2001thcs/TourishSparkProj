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
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
import {
  AuthorPayload,
  TourishPlan,
  TourishPlanInfoParam,
  TourishPlanParam,
  TourishPlanStatusParam,
  Category,
  CategoryPayload,
  Publisher,
  Voucher,
  Author,
  VoucherPayload,
} from "./tourishPlan-detail.component.model";
import * as TourishPlanActions from "./tourishPlan-detail.store.action";
import { State as TourishPlanState } from "./tourishPlandetail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editTourishPlan,
  getTourishPlan,
  getMessage,
  getSysError,
} from "./tourishPlan-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-tourishPlan-detail",
  templateUrl: "./tourishPlan-detail.component.html",
  styleUrls: ["./tourishPlan-detail.component.css"],
})
export class TourishPlanDetailAdminComponent implements OnInit, OnDestroy {
  tourishPlanId: string = "";
  isEditing: boolean = true;
  isSubmitting = false;
  tourishPlan: TourishPlan = {
    id: "",
    title: "",
    description: "",
    publisherId: "",
    pageNumber: 0,

    tourishPlanSize: "",
    tourishPlanWeight: 0,
    coverMaterial: 0,
    publishYear: 2000,

    tourishPlanStatus: {
      currentPrice: 0,
      totalSoldNumber: 0,
      soldNumberInMonth: 0,
      remainNumber: 0,
    },
  };
  tourishPlanParam!: TourishPlanParam;

  categorySubmitString: string = "";
  voucherSubmitString: string = "";
  publisherSubmitString: string = "";
  authorSubmitString: string = "";

  author_list: Author[] = [];
  author_submit!: any;

  publisher_list: Publisher[] = [];
  publisher_submit!: any;

  category_list: Category[] = [];
  category_submit!: any;

  voucher_list: Voucher[] = [];
  voucher_submit!: any;

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;
  editformGroup_status!: FormGroup;

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  tourishPlanState!: Observable<any>;
  editTourishPlanState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<TourishPlanState>,
    private messageService: MessageService,
    private _route: ActivatedRoute
  ) {
    this.tourishPlanState = this.store.select(getTourishPlan);
    this.editTourishPlanState = this.store.select(editTourishPlan);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.tourishPlanId = this._route.snapshot.paramMap.get("id") ?? "";

    this.editformGroup_info = this.fb.group({
      id: [this.tourishPlanId, Validators.compose([Validators.required])],
      title: [
        this.tourishPlan.title ?? "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      pageNumber: [
        this.tourishPlan.pageNumber ?? 0,
        Validators.compose([Validators.required]),
      ],

      tourishPlanSize: [
        this.tourishPlan.tourishPlanSize ?? 0,
        Validators.compose([Validators.required]),
      ],

      coverMaterial: [
        this.tourishPlan.coverMaterial ?? 0,
        Validators.compose([Validators.required]),
      ],

      publishYear: [
        this.tourishPlan.publishYear ?? 0,
        Validators.compose([Validators.required]),
      ],

      tourishPlanWeight: [
        this.tourishPlan.tourishPlanWeight ?? 0,
        Validators.compose([Validators.required]),
      ],

      description: this.tourishPlan.description,
    });

    this.editformGroup_status = this.fb.group({
      productId: [this.tourishPlanId, Validators.compose([Validators.required])],

      currentPrice: [
        this.tourishPlan.tourishPlanStatus.currentPrice ?? 0,
        Validators.compose([Validators.required]),
      ],
      totalSoldNumber: [
        this.tourishPlan.tourishPlanStatus.totalSoldNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      remainNumber: [
        this.tourishPlan.tourishPlanStatus.remainNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      soldNumberInMonth: [
        this.tourishPlan.tourishPlanStatus.soldNumberInMonth ?? 0,
        Validators.compose([Validators.required]),
      ],
    });

    this.editformGroup_status = this.fb.group({
      productId: [this.tourishPlanId, Validators.compose([Validators.required])],

      currentPrice: [
        this.tourishPlan.tourishPlanStatus.currentPrice ?? 0,
        Validators.compose([Validators.required]),
      ],
      totalSoldNumber: [
        this.tourishPlan.tourishPlanStatus.totalSoldNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      remainNumber: [
        this.tourishPlan.tourishPlanStatus.remainNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      soldNumberInMonth: [
        this.tourishPlan.tourishPlanStatus.soldNumberInMonth ?? 0,
        Validators.compose([Validators.required]),
      ],
    });

    this.subscriptions.push(
      this.tourishPlanState.subscribe((state) => {
        if (state) {
          this.tourishPlan = state;
          this.editformGroup_info.controls["title"].setValue(state.title);
          this.editformGroup_info.controls["pageNumber"].setValue(
            state.pageNumber
          );
          this.editformGroup_info.controls["description"].setValue(
            state.description
          );
          this.editformGroup_info.controls["tourishPlanSize"].setValue(state.tourishPlanSize);
          this.editformGroup_info.controls["tourishPlanWeight"].setValue(
            state.tourishPlanWeight
          );
          
          this.editformGroup_info.controls["coverMaterial"].setValue(
            state.coverMaterial
          );

          this.editformGroup_info.controls["publishYear"].setValue(
            state.publishYear
          );

          this.editformGroup_status.controls["remainNumber"].setValue(
            state.tourishPlanStatus.remainNumber
          );
          this.editformGroup_status.controls["currentPrice"].setValue(
            state.tourishPlanStatus.currentPrice
          );
          this.editformGroup_status.controls["soldNumberInMonth"].setValue(
            state.tourishPlanStatus.soldNumberInMonth
          );
          this.editformGroup_status.controls["totalSoldNumber"].setValue(
            state.tourishPlanStatus.totalSoldNumber
          );

          this.author_list = state.tourishPlanAuthors ?? [];
          this.voucher_list = state.tourishPlanVouchers ?? [];
          this.publisher_list = [state.publisher] ?? [];
          this.category_list = state.tourishPlanCategories ?? [];

          console.log(this.tourishPlan);
        }
      })
    );

    this.subscriptions.push(
      this.editTourishPlanState.subscribe((state) => {
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
      TourishPlanActions.getTourishPlan({
        payload: {
          id: this.tourishPlanId,
        },
      })
    );

    this.store.dispatch(TourishPlanActions.initial());

    //console.log(this.this_tourishPlan);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(TourishPlanActions.resetTourishPlan());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formSubmitInfoReset(): void {
    this.editformGroup_info.setValue({
      title: this.tourishPlan.title,
      pageNumber: this.tourishPlan.pageNumber,
      description: this.tourishPlan.description,
      PublisherId: this.tourishPlan.publisherId,

      tourishPlanSize: this.tourishPlan.tourishPlanSize,
      tourishPlanWeight: this.tourishPlan.tourishPlanWeight,
      coverMaterial: this.tourishPlan.coverMaterial,
      publishYear: this.tourishPlan.publishYear,
    });
  }

  formSubmitStatusReset(): void {
    this.editformGroup_info.setValue({
      soldNumberInMonth: this.tourishPlan.tourishPlanStatus.soldNumberInMonth,
      totalSoldNumber: this.tourishPlan.tourishPlanStatus.totalSoldNumber,
      remainNumber: this.tourishPlan.tourishPlanStatus.remainNumber,
      currentPrice: this.tourishPlan.tourishPlanStatus.currentPrice,
    });
  }

  formSubmit_edit_info(): void {
    const payload: TourishPlanInfoParam = {
      id: this.tourishPlanId,
      title: this.editformGroup_info.value.title,
      description: this.editformGroup_info.value.description,
      pageNumber: this.editformGroup_info.value.pageNumber,
      publisherId: this.publisherSubmitString,

      tourishPlanSize: this.editformGroup_info.value.tourishPlanSize,
      tourishPlanWeight: this.editformGroup_info.value.tourishPlanWeight,
      coverMaterial: this.editformGroup_info.value.coverMaterial,
      publishYear: this.editformGroup_info.value.publishYear,
    };

    this.store.dispatch(
      TourishPlanActions.editTourishPlan({
        payload: payload,
      })
    );
  }

  formSubmit_edit_status(): void {
    const payload: TourishPlanStatusParam = {
      id: this.tourishPlanId,
      tourishPlanStatus: {
        soldNumberInMonth: this.editformGroup_status.value.soldNumberInMonth,
        totalSoldNumber: this.editformGroup_status.value.totalSoldNumber,
        remainNumber: this.editformGroup_status.value.remainNumber,
        currentPrice: this.editformGroup_status.value.currentPrice,
      },
    };

    this.store.dispatch(
      TourishPlanActions.editTourishPlan({
        payload: payload,
      })
    );
  }

  changeCoverMaterial(event: any) {
    this.editformGroup_info.controls["coverMaterial"].setValue(event.value);

    console.log(this.editformGroup_info.value.coverMaterial);
  }

  formSubmit_edit_voucher(): void {
    const payload: VoucherPayload = {
      id: this.tourishPlanId,
      voucherRelationString: this.voucherSubmitString,
    };

    this.store.dispatch(
      TourishPlanActions.editTourishPlan({
        payload: payload,
      })
    );
  }

  formSubmit_edit_author(): void {
    const payload: AuthorPayload = {
      id: this.tourishPlanId,
      authorRelationString: this.authorSubmitString,
    };

    this.store.dispatch(
      TourishPlanActions.editTourishPlan({
        payload: payload,
      })
    );
  }

  formSubmit_edit_category(): void {
    const payload: CategoryPayload = {
      id: this.tourishPlanId,
      categoryRelationString: this.categorySubmitString,
    };

    this.store.dispatch(
      TourishPlanActions.editTourishPlan({
        payload: payload,
      })
    );
  }

  formSubmitCategoryReset(): void {
    this.category_list = this.tourishPlan.tourishPlanCategories ?? [];
  }

  formSubmitVoucherReset(): void {
    this.voucher_list = this.tourishPlan.tourishPlanVouchers ?? [];
  }

  formSubmitAuthorReset(): void {
    this.author_list = this.tourishPlan.tourishPlanAuthors ?? [];
  }

  selectChange_author = (event: any) => {
    console.log(event.data);
    this.author_submit = [...event.data];
    //console.log(this.author_submit);
    this.authorSubmitString = this.author_submit.join(";");

    console.log(this.authorSubmitString);
  };

  selectChange_publisher = (event: any) => {
    console.log(event.data);
    this.publisher_submit = [...event.data];
    //console.log(this.author_submit);
    this.publisherSubmitString = this.publisher_submit[0];
  };

  selectChange_category = (event: any) => {
    console.log(event.data);
    this.category_submit = [...event.data];
    //console.log(this.author_submit);
    this.categorySubmitString = this.category_submit.join(";");
  };

  selectChange_voucher = (event: any) => {
    console.log(event.data);
    this.voucher_submit = [...event.data];
    //console.log(this.author_submit);
    this.voucherSubmitString = this.voucher_submit.join(";");
  };

  openDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Bạn có muốn rời đi?",
      },
    });
    return ref.afterClosed();
  }

  uploadFinished(event: any) {
    console.log(event);
  }

  checkDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log("abc");
    return (
      !this.editformGroup_info.dirty ||
      !this.editformGroup_status.dirty ||
      this.openDialog()
    );
  }
}
