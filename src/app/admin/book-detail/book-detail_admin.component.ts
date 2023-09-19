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
import { AdminService } from "../service/admin.service";
import { CheckDeactivate } from "../interface/admin.check_edit";
import {
  AuthorPayload,
  Book,
  BookInfoParam,
  BookParam,
  BookStatusParam,
  Category,
  CategoryPayload,
  Publisher,
  Voucher,
  Author,
  VoucherPayload,
} from "./book-detail.component.model";
import * as BookActions from "./book-detail.store.action";
import { State as BookState } from "./book-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  editBook,
  getBook,
  getMessage,
  getSysError,
} from "./book-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"],
})
export class BookDetailAdminComponent implements OnInit, OnDestroy {
  bookId: string = "";
  isEditing: boolean = true;
  isSubmitting = false;
  book: Book = {
    id: "",
    title: "",
    description: "",
    publisherId: "",
    pageNumber: 0,

    bookSize: "",
    bookWeight: 0,
    coverMaterial: 0,
    publishYear: 2000,

    bookStatus: {
      currentPrice: 0,
      totalSoldNumber: 0,
      soldNumberInMonth: 0,
      remainNumber: 0,
    },
  };
  bookParam!: BookParam;

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
  bookState!: Observable<any>;
  editBookState!: Observable<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private adminService: AdminService,
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<BookState>,
    private messageService: MessageService,
    private _route: ActivatedRoute
  ) {
    this.bookState = this.store.select(getBook);
    this.editBookState = this.store.select(editBook);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.bookId = this._route.snapshot.paramMap.get("id") ?? "";

    this.editformGroup_info = this.fb.group({
      id: [this.bookId, Validators.compose([Validators.required])],
      title: [
        this.book.title ?? "",
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      pageNumber: [
        this.book.pageNumber ?? 0,
        Validators.compose([Validators.required]),
      ],

      bookSize: [
        this.book.bookSize ?? 0,
        Validators.compose([Validators.required]),
      ],

      coverMaterial: [
        this.book.coverMaterial ?? 0,
        Validators.compose([Validators.required]),
      ],

      publishYear: [
        this.book.publishYear ?? 0,
        Validators.compose([Validators.required]),
      ],

      bookWeight: [
        this.book.bookWeight ?? 0,
        Validators.compose([Validators.required]),
      ],

      description: this.book.description,
    });

    this.editformGroup_status = this.fb.group({
      productId: [this.bookId, Validators.compose([Validators.required])],

      currentPrice: [
        this.book.bookStatus.currentPrice ?? 0,
        Validators.compose([Validators.required]),
      ],
      totalSoldNumber: [
        this.book.bookStatus.totalSoldNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      remainNumber: [
        this.book.bookStatus.remainNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      soldNumberInMonth: [
        this.book.bookStatus.soldNumberInMonth ?? 0,
        Validators.compose([Validators.required]),
      ],
    });

    this.editformGroup_status = this.fb.group({
      productId: [this.bookId, Validators.compose([Validators.required])],

      currentPrice: [
        this.book.bookStatus.currentPrice ?? 0,
        Validators.compose([Validators.required]),
      ],
      totalSoldNumber: [
        this.book.bookStatus.totalSoldNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      remainNumber: [
        this.book.bookStatus.remainNumber ?? 0,
        Validators.compose([Validators.required]),
      ],
      soldNumberInMonth: [
        this.book.bookStatus.soldNumberInMonth ?? 0,
        Validators.compose([Validators.required]),
      ],
    });

    this.subscriptions.push(
      this.bookState.subscribe((state) => {
        if (state) {
          this.book = state;
          this.editformGroup_info.controls["title"].setValue(state.title);
          this.editformGroup_info.controls["pageNumber"].setValue(
            state.pageNumber
          );
          this.editformGroup_info.controls["description"].setValue(
            state.description
          );
          this.editformGroup_info.controls["bookSize"].setValue(state.bookSize);
          this.editformGroup_info.controls["bookWeight"].setValue(
            state.bookWeight
          );
          
          this.editformGroup_info.controls["coverMaterial"].setValue(
            state.coverMaterial
          );

          this.editformGroup_info.controls["publishYear"].setValue(
            state.publishYear
          );

          this.editformGroup_status.controls["remainNumber"].setValue(
            state.bookStatus.remainNumber
          );
          this.editformGroup_status.controls["currentPrice"].setValue(
            state.bookStatus.currentPrice
          );
          this.editformGroup_status.controls["soldNumberInMonth"].setValue(
            state.bookStatus.soldNumberInMonth
          );
          this.editformGroup_status.controls["totalSoldNumber"].setValue(
            state.bookStatus.totalSoldNumber
          );

          this.author_list = state.bookAuthors ?? [];
          this.voucher_list = state.bookVouchers ?? [];
          this.publisher_list = [state.publisher] ?? [];
          this.category_list = state.bookCategories ?? [];

          console.log(this.book);
        }
      })
    );

    this.subscriptions.push(
      this.editBookState.subscribe((state) => {
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
      BookActions.getBook({
        payload: {
          id: this.bookId,
        },
      })
    );

    this.store.dispatch(BookActions.initial());

    //console.log(this.this_book);
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(BookActions.resetBook());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  formSubmitInfoReset(): void {
    this.editformGroup_info.setValue({
      title: this.book.title,
      pageNumber: this.book.pageNumber,
      description: this.book.description,
      PublisherId: this.book.publisherId,

      bookSize: this.book.bookSize,
      bookWeight: this.book.bookWeight,
      coverMaterial: this.book.coverMaterial,
      publishYear: this.book.publishYear,
    });
  }

  formSubmitStatusReset(): void {
    this.editformGroup_info.setValue({
      soldNumberInMonth: this.book.bookStatus.soldNumberInMonth,
      totalSoldNumber: this.book.bookStatus.totalSoldNumber,
      remainNumber: this.book.bookStatus.remainNumber,
      currentPrice: this.book.bookStatus.currentPrice,
    });
  }

  formSubmit_edit_info(): void {
    const payload: BookInfoParam = {
      id: this.bookId,
      title: this.editformGroup_info.value.title,
      description: this.editformGroup_info.value.description,
      pageNumber: this.editformGroup_info.value.pageNumber,
      publisherId: this.publisherSubmitString,

      bookSize: this.editformGroup_info.value.bookSize,
      bookWeight: this.editformGroup_info.value.bookWeight,
      coverMaterial: this.editformGroup_info.value.coverMaterial,
      publishYear: this.editformGroup_info.value.publishYear,
    };

    this.store.dispatch(
      BookActions.editBook({
        payload: payload,
      })
    );
  }

  formSubmit_edit_status(): void {
    const payload: BookStatusParam = {
      id: this.bookId,
      bookStatus: {
        soldNumberInMonth: this.editformGroup_status.value.soldNumberInMonth,
        totalSoldNumber: this.editformGroup_status.value.totalSoldNumber,
        remainNumber: this.editformGroup_status.value.remainNumber,
        currentPrice: this.editformGroup_status.value.currentPrice,
      },
    };

    this.store.dispatch(
      BookActions.editBook({
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
      id: this.bookId,
      voucherRelationString: this.voucherSubmitString,
    };

    this.store.dispatch(
      BookActions.editBook({
        payload: payload,
      })
    );
  }

  formSubmit_edit_author(): void {
    const payload: AuthorPayload = {
      id: this.bookId,
      authorRelationString: this.authorSubmitString,
    };

    this.store.dispatch(
      BookActions.editBook({
        payload: payload,
      })
    );
  }

  formSubmit_edit_category(): void {
    const payload: CategoryPayload = {
      id: this.bookId,
      categoryRelationString: this.categorySubmitString,
    };

    this.store.dispatch(
      BookActions.editBook({
        payload: payload,
      })
    );
  }

  formSubmitCategoryReset(): void {
    this.category_list = this.book.bookCategories ?? [];
  }

  formSubmitVoucherReset(): void {
    this.voucher_list = this.book.bookVouchers ?? [];
  }

  formSubmitAuthorReset(): void {
    this.author_list = this.book.bookAuthors ?? [];
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
