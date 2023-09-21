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

import {
  AuthorPayload,
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

import { Book } from "src/app/model/book";

import * as BookActions from "./book-detail.store.action";
import { State as BookState } from "./book-detail.store.reducer";
import { Store } from "@ngrx/store";
import {
  getBook,
  getImageList,
  getMessage,
  getSysError,

} from "./book-detail.store.selector";
import { MessageService } from "src/app/utility/user_service/message.service";
import { FileModel } from "src/app/utility/image_service/imageUpload.component.model";
import { getCategoryPhase } from "src/app/utility/config/categoryCode";
import { getCoverMaterialPhase } from "src/app/utility/config/coverMaterialCode";
import { getLanguagePhase } from "src/app/utility/config/languageCode";

@Component({
  selector: "app-book-detail",
  templateUrl: "./book-detail.component.html",
  styleUrls: ["./book-detail.component.css"],
})
export class BookDetailComponent implements OnInit, OnDestroy {
  bookId: string = "";
  isEditing: boolean = true;
  isSubmitting = false;
  book: Book = {
    id: "",
    title: "",
    description: "",
    publisherId: "",
    pageNumber: 0,
    coverMaterial: 0,
    language: 1,
    bookSize: "",
    bookWeight: 0,
    publishYear: 0,

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

  imageList!: FileModel[];
  urlListOld: string[] = [];

  this_announce = "";
  firstTime = false;
  editformGroup_info!: FormGroup;
  editformGroup_status!: FormGroup;

  imageState!: Observable<any>;
  errorMessageState!: Observable<any>;
  errorSystemState!: Observable<any>;
  bookState!: Observable<any>;
  editBookState!: Observable<any>;
  subscriptions: Subscription[] = [];

  discountFloat = 0;

  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder,
    private store: Store<BookState>,
    private messageService: MessageService,
    private _route: ActivatedRoute
  ) {
    this.bookState = this.store.select(getBook);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);

    this.imageState = this.store.select(getImageList);
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

          this.getDiscountFloat(this.book);

          console.log(this.discountFloat);

          this.editformGroup_info.controls["title"].setValue(state.title);
          this.editformGroup_info.controls["pageNumber"].setValue(
            state.pageNumber
          );
          this.editformGroup_info.controls["description"].setValue(
            state.description
          );

          this.editformGroup_status.controls["remainNumber"].setValue(state.bookStatus.remainNumber);
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
      this.imageState.subscribe((state) => {
        if (state) {
          this.imageList = state.data;

          if (this.imageList?.length > 0) {
            this.imageList.forEach((image) => {
              this.urlListOld.push(
                "https://bookstore1storage.blob.core.windows.net/1-container/" +
                  "1" +
                  "_" +
                  image.id +
                  image.fileType
              );
            });
          }
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

    this.store.dispatch(
      BookActions.getImageList({
        payload: {
          resourceId: this.bookId,
          resourceType: 1,
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

  generateDiscount(discountFloat: number): string {
    return (discountFloat*100).toString() + '%';
  }

  openDialog() {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: "Bạn có muốn rời đi?",
      },
    });
    return ref.afterClosed();
  }

  uploadFinished(event: any){
    console.log(event);
  }

  generateUrl(image: FileModel) {
    return (
      "https://bookstore1storage.blob.core.windows.net/1-container/" +
      "1" +
      "_" +
      image.id +
      image.fileType
    );
  }

  getDiscountFloat(book: Book) {
    let discountFloat = 0;
    let voucherList = book?.bookVouchers;
    voucherList?.forEach((voucherOne) => {
      if (voucherOne.voucher.discountFloat > discountFloat) {
        discountFloat = voucherOne.voucher.discountFloat;
      }
    });

    this.discountFloat = discountFloat;

    return discountFloat;
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

  getCategoryPhase(key: string){
    return getCategoryPhase(key);
  }

  getCoverMaterialPhase(key: number){
    return getCoverMaterialPhase(key);
  }

  getLanguagePhase(key: number){
    return getLanguagePhase(key);
  }
}
