import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { FormControl, FormGroup } from "@angular/forms";
import { OnInitEffects } from "@ngrx/effects";
import { NbDialogService, NbMenuService } from "@nebular/theme";
import { Observable, Subscription, debounceTime, filter, map } from "rxjs";
import { UserService } from "src/app/utility/user_service/user.service";
import { Author, Book } from "../book-detail/book-detail.component.model";
import { TokenStorageService } from "src/app/utility/user_service/token.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @ViewChild("mySidenav")
  myNameElem!: ElementRef;

  @ViewChild("autocompleteSearch")
  autocompleteSearch!: ElementRef;

  @ViewChild("searchInput") searchInput!: ElementRef<HTMLInputElement>;

  isNavOpen = false;
  isAutoCompleteOpen = false;

  filteredInput!: Observable<string | null>;
  searchFormGroup!: FormGroup;

  searchControl = new FormControl("");

  countNavClick = 0;
  countSearchClick = 0;
  subscriptions: Subscription[] = [];

  authorList: Author[] = [];
  bookList: Book[] = [];

  menuItems = [{ title: "Cài đặt" }, { title: "Đăng xuất" }];

  constructor(
    private dialog: MatDialog,
    private dialogService: NbDialogService,
    private _elementRef: ElementRef,
    private tokenService: TokenStorageService,
    private router: Router,
    private _api: UserService,
    private nbMenuService: NbMenuService
  ) {
    this.filteredInput = this.searchControl.valueChanges.pipe(
      debounceTime(400)
    );
  }

  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      search: new FormControl(),
    });

    this.subscriptions.push(
      this.nbMenuService
        .onItemClick()
        .pipe(
          filter(({ tag }) => tag === "user-menu"),
          map(({ item: { title } }) => title)
        )
        .subscribe((title) => {
          if (title === "Đăng xuất") {
            this.signOut();
          }
        })
    );

    this.subscriptions.push(
      this.filteredInput.subscribe((state) => {
        // Reset
        if (state) {
          this._api
            .searchBook((state ?? "").toLowerCase())
            .pipe(debounceTime(400))
            .subscribe((stateBook) => {
              this.bookList = stateBook.data;

              console.log(this.bookList);
            });

          this._api
            .searchAuthor((state ?? "").toLowerCase())
            .pipe(debounceTime(400))
            .subscribe((stateAuthor) => {
              this.authorList = stateAuthor.data;
            });

          this.openAutoCompleteSearch();
        } else {
          this.closeAutoCompleteSearch();
        }
      })
    );
  }

  // openDialog() {
  //   const ref = this.dialog.open(LoginComponent, {
  //     data: {
  //       title: 'Do you want to leave this page?',
  //     },
  //   });
  //   ref.afterClosed().subscribe((result) => {
  //     console.log(`Dialog result: ${result}`);
  //   });

  //   return ref.afterClosed();
  // }

  async signOut() {
    await this.tokenService.signOut();
    this.router.navigate(["/guest/home"]);
  }

  formSubmit(): void {}

  openNav() {
    this.myNameElem.nativeElement.style.height = "190px";
    this.myNameElem.nativeElement.style["margin-top"] = "30px";
    this.myNameElem.nativeElement.style["padding-top"] = "25px";
    this.myNameElem.nativeElement.style["padding-bottom"] = "25px";
    this.myNameElem.nativeElement.style["border-bottom"] = "2px solid #EDF1F7";
    this.myNameElem.nativeElement.style["border-left"] = "2px solid #EDF1F7";
    this.myNameElem.nativeElement.style["border-right"] = "2px solid #EDF1F7";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    this.isNavOpen = true;
  }

  closeNav() {
    this.myNameElem.nativeElement.style.height = "0";
    this.myNameElem.nativeElement.style["padding-top"] = "0";
    this.myNameElem.nativeElement.style["margin-top"] = "25px";
    this.myNameElem.nativeElement.style["padding-bottom"] = "0px";
    this.myNameElem.nativeElement.style["border-bottom"] = "0px solid #EDF1F7";
    this.myNameElem.nativeElement.style["border-left"] = "0px solid #EDF1F7";
    this.myNameElem.nativeElement.style["border-right"] = "0px solid #EDF1F7";
    document.body.style.backgroundColor = "white";
    this.isNavOpen = false;
    this.countNavClick = 0;
  }

  openAutoCompleteSearch() {
    this.autocompleteSearch.nativeElement.style.height = "fit-content";
    this.autocompleteSearch.nativeElement.style["margin-top"] = "30px";
    this.autocompleteSearch.nativeElement.style["padding-top"] = "25px";
    this.autocompleteSearch.nativeElement.style["padding-bottom"] = "25px";
    this.autocompleteSearch.nativeElement.style["border-bottom"] =
      "2px solid #EDF1F7";
    this.autocompleteSearch.nativeElement.style["border-left"] =
      "2px solid #EDF1F7";
    this.autocompleteSearch.nativeElement.style["border-right"] =
      "2px solid #EDF1F7";
    document.body.style.backgroundColor = "rgba(0,0,0,0.4)";
    this.isAutoCompleteOpen = true;
  }

  closeAutoCompleteSearch() {
    this.autocompleteSearch.nativeElement.style.height = "0";
    this.autocompleteSearch.nativeElement.style["padding-top"] = "0";
    this.autocompleteSearch.nativeElement.style["margin-top"] = "25px";
    this.autocompleteSearch.nativeElement.style["padding-bottom"] = "0px";
    this.autocompleteSearch.nativeElement.style["border-bottom"] =
      "0px solid #EDF1F7";
    this.autocompleteSearch.nativeElement.style["border-left"] =
      "0px solid #EDF1F7";
    this.autocompleteSearch.nativeElement.style["border-right"] =
      "0px solid #EDF1F7";
    document.body.style.backgroundColor = "white";
    this.isAutoCompleteOpen = false;
    this.countSearchClick = 0;
  }

  outsideClick(hasClickedOutside: any) {
    if (hasClickedOutside && this.isNavOpen) {
      this.countNavClick++;
      console.log(this.countNavClick);
      if (this.countNavClick >= 2) this.closeNav();
    }
  }

  outsideAutoCompleteSearchClick(hasClickedOutside: any) {
    if (hasClickedOutside && this.isAutoCompleteOpen) {
      this.countSearchClick++;
      if (this.countSearchClick >= 1) this.closeAutoCompleteSearch();
    }
  }

  async navMenuClick() {
    if (this.isNavOpen) {
      await this.closeNav();
    } else if (!this.isNavOpen) {
      await this.openNav();
    }
  }

  navigateCart() {
    this.router.navigate(["/user/cart"]);
  }

  navigateDetail() {
    this.router.navigate(["/user/search"], {
      queryParams: { keyword: this.searchControl.value },
    });
    this.closeAutoCompleteSearch();
  }
}
