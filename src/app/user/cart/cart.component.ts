import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { FormControl, FormGroup } from "@angular/forms";
import { OnInitEffects } from "@ngrx/effects";
import { NbDialogService } from "@nebular/theme";
import { LoginComponent } from "src/app/guest/log/login/login.component";
import { TokenStorageService } from "src/app/utility/user_service/token.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
})
export class CartComponent implements OnInit {
  @ViewChild("mySidenav")
  myNameElem!: ElementRef;

  isNavOpen = false;

  constructor(
    private dialog: MatDialog,
    private dialogService: NbDialogService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}
  searchFormGroup!: FormGroup;

  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      search: new FormControl(),
    });
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

  openDialog() {
    this.dialogService
      .open(LoginComponent)
      .onClose.subscribe((result) => console.log(`Dialog result: ${result}`));
  }

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
  }

  navMenuClick() {
    if (this.isNavOpen) {
      this.closeNav();
      this.isNavOpen = false;
    } else if (!this.isNavOpen) {
      this.openNav();
      this.isNavOpen = true;
    }
  }
}
