import { Component, OnInit, Inject } from "@angular/core";
import { FormGroup, Validators } from "@angular/forms";
import { FormBuilder } from "@angular/forms";
import { UserService } from "../../../utility/user_service/user.service";
import { HashService } from "../../../utility/user_service/hash.service";
import { Router } from "@angular/router";
import { Observable, Subscription, timeout } from "rxjs";
import { LoginUnionActions } from "./login.store.action";
import { Store } from "@ngrx/store";
import { getLoginProfile, getMessage, getSysError } from "./login.store.selector";
import * as LoginAction from "./login.store.action";
import { TokenStorageService } from "src/app/utility/user_service/token.service";
import { MessageService } from "src/app/utility/user_service/message.service";
import { NbDialogRef } from "@nebular/theme";
import { ConfirmDialogComponent, DialogData } from "src/app/utility/confirm-dialog/confirm-dialog.component";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
export interface DialogSignInData {
  title: string;
}

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  signInformGroup!: FormGroup;
  errorMessage = "";

  getLoginProfile: Observable<any>;
  errorMessageState: Observable<any>;
  errorSystemState: Observable<any>;
  
  subscriptions: Subscription[] = [];
  loginProfile: any;


  constructor(
    private fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    public dialogRef: MatDialogRef<LoginComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private messageService: MessageService,
    private hash: HashService,
    private router: Router,
    private store: Store<LoginUnionActions>,
  ) {
    this.getLoginProfile = this.store.select(getLoginProfile);
    this.errorMessageState = this.store.select(getMessage);
    this.errorSystemState = this.store.select(getSysError);
  }

  ngOnInit(): void {
    this.signInformGroup = this.fb.group({
      userName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      password: [
        "",
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });

    this.subscriptions.push(
      this.getLoginProfile.subscribe((state) => {
        if (state) {
          this.loginProfile = state;
          console.log(state);
          const response = JSON.parse(
            window.atob(state.accessToken.split(".")[1])
          );

          this.tokenStorage.saveToken(state.accessToken);
          this.tokenStorage.saveRefreshToken(state.refreshToken);
          this.tokenStorage.saveUser(response);
          console.log(response);

          this.messageService
            .openNotifyDialog("Đăng nhập thành công")
            .subscribe((res) => {
              if (response) {
                console.log(response);
                this.onNoClick();
                if (response.Role === "User") {
                  this.router.navigate(["/user/home"]);
                } else if (response.Role === "Admin") {
                  this.router.navigate(["/admin/book/list"]);
                }
              }
            });
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

    this.store.dispatch(LoginAction.initial());
  }

  ngOnDestroy(): void {
    console.log("Destroy");
    this.store.dispatch(LoginAction.resetLogin());

    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  valueChange(target: string, event: Event) {
    this.signInformGroup.value[target] = event;
    console.log(event);
  }

  formReset(): void {
    this.signInformGroup.setValue({
      userName: "man2001thcs",
      password: "123",
    });
  }

  formSubmit(): void {
    //console.log(this.signInformGroup.value);

    this.store.dispatch(
      LoginAction.login({
        payload: {
          userName: this.signInformGroup.value.userName,
          password: this.signInformGroup.value.password,
        },
      })
    );
  }
}
