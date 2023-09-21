import { Response } from "../../model/response";
import { Component, OnDestroy, OnInit } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable, Subscription, map } from "rxjs";
import { ConfirmDialogComponent } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { NotifyDialogComponent } from "src/app/utility/notification_admin/notify-dialog.component";
import { MatDialog } from "@angular/material/dialog";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import {
  Book,
  Author,
  Voucher,
  Category,
  Publisher,
} from "./book-create.component.model";
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";

import * as BookActions from "./book-create.store.action";
import { State as BookState } from "./book-create.store.reducer";
import { Store } from "@ngrx/store";
import { MessageService } from "src/app/utility/user_service/message.service";
import { getBook, getMessage, getSysError } from "./book-create.store.selector";
@Component({
  selector: "app-book-create",
  templateUrl: "./book-create.component.html",
  styleUrls: ["./book-create.component.css"],
})
export class BookCreateAdminComponent
  implements OnInit, OnDestroy, CheckDeactivate
{
  isEditing: boolean = true;
  isSubmitting: boolean = false;

  coverMaterial = 0;
  this_announce = "";

  createformGroup!: FormGroup;

  author_list!: Author[];
  author_submit!: any;

  publisher_list!: Publisher[];
  publisher_submit!: any;

  category_list!: Category[];
  category_submit!: any;

  voucher_list!: Voucher[];
  voucher_submit!: any;

  categorySubmitString: string = "";
  voucherSubmitString: string = "";
  publisherSubmitString: string = "";
  authorSubmitString: string = "";

  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  bookState!: Observable<any>;

  authorListState!: Observable<any>;
  voucherListState!: Observable<any>;
  publishListState!: Observable<any>;
  categoryListState!: Observable<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private _route: ActivatedRoute,
    private store: Store<BookState>,
    private messageService: MessageService
  ) {
    this.bookState = this.store.select(getBook);

    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.createformGroup = this.fb.group({
      title: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
      pageNumber: 0,
      description: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],

      soldNumberInMonth: 0,
      totalSoldNumber: 0,
      remainNumber: 0,
      currentPrice: 0,

      bookSize: "",
      bookWeight: 0,
      coverMaterial: 0,
      publishYear: 2000,
    });

    this.subscriptions.push(
      this.bookState.subscribe((state) => {
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
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(BookActions.resetBook());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formSubmit_create_info(): void {
    this.store.dispatch(
      BookActions.createBook({
        payload: {
          title: this.createformGroup.value.title,
          description: this.createformGroup.value.description,
          pageNumber: this.createformGroup.value.pageNumber,
          PublisherId: this.publisherSubmitString,

          bookSize: this.createformGroup.value.bookSize,
          bookWeight: this.createformGroup.value. bookWeight,
          coverMaterial: this.createformGroup.value.coverMaterial,
          publishYear: this.createformGroup.value.publishYear,

          soldNumberInMonth: this.createformGroup.value.soldNumberInMonth,
          totalSoldNumber: this.createformGroup.value.totalSoldNumber,
          remainNumber: this.createformGroup.value.remainNumber,
          currentPrice: this.createformGroup.value.currentPrice,

          categoryRelationString: this.categorySubmitString,
          authorRelationString: this.authorSubmitString,
          voucherRelationString: this.voucherSubmitString,
        },
      })
    );

    console.log(this.createformGroup.value);
  }

  formReset_create_info(): void {
    this.isSubmitting = true;
    this.createformGroup.setValue({
      title: "",
      pageNumber: 0,
      description: "",
      PublisherId: "",

      bookSize: "",
      bookWeight: 0,
      coverMaterial: 0,
      publishYear: 2000,

      soldNumberInMonth: this.createformGroup.value.soldNumberInMonth,
      totalSoldNumber: this.createformGroup.value.totalSoldNumber,
      remainNumber: this.createformGroup.value.remainNumber,
      currentPrice: this.createformGroup.value.currentPrice,

      categoryRelationString: "",
      authorRelationString: "",
      voucherRelationString: "",
    });
  }

  openDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Bạn có muốn rời đi?",
      },
    });
    return ref.afterClosed();
  }

  openNotifyDialog() {
    const ref = this.dialog.open(NotifyDialogComponent, {
      data: {
        title: this.this_announce,
      },
    });
    return ref.afterClosed();
  }

  changeCoverMaterial(event: any) {
   
    this.createformGroup.controls["coverMaterial"].setValue(
      event.value
    );

    console.log(this.createformGroup.value.coverMaterial);
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
    return !this.createformGroup.dirty || this.openDialog();
  }

  selectChange_author = (event: any) => {
    console.log(event.data);
    this.author_submit = [...event.data];
    //console.log(this.author_submit);
    this.authorSubmitString = this.author_submit.join(";");
  };

  selectChange_publisher = (event: any) => {
    console.log(event.data);
    this.publisher_submit = [...event.data];
    console.log(this.createformGroup.dirty);
    //console.log(this.author_submit);
    this.publisherSubmitString = this.publisher_submit[0];
  };

  selectChange_category = (event: any) => {
    console.log(event.data);
    this.category_submit = [...event.data];
    //console.log(this.author_submit);
    this.categorySubmitString = this.category_submit.join(";");
    console.log(this.categorySubmitString);
  };

  selectChange_voucher = (event: any) => {
    console.log(event.data);
    this.voucher_submit = [...event.data];
    //console.log(this.author_submit);
    this.voucherSubmitString = this.voucher_submit.join(";");
  };
}
