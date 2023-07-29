import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../utility/user_service/user.service';
import { HashService } from '../../../utility/user_service/hash.service';
import { Router } from '@angular/router';
import { Observable, Subscription, timeout } from 'rxjs';
import { LoginUnionActions } from './login.store.action';
import { Store } from '@ngrx/store';
import { getLoginProfile } from './login.store.selector';
import * as LoginAction from './login.store.action';
import { TokenStorageService } from 'src/app/utility/user_service/token.service';
export interface DialogSignInData {
  title: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  signInformGroup!: FormGroup;
  errorMessage = '';

  getLoginProfile: Observable<any>;
  subscriptions: Subscription[] = [];
  loginProfile: any;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private tokenStorage: TokenStorageService,
    private userService: UserService,
    private hash: HashService,
    private router: Router,
    private store: Store<LoginUnionActions>,
    @Inject(MAT_DIALOG_DATA) public data: DialogSignInData
  ) {
    this.getLoginProfile = this.store.select(getLoginProfile);
  }

  ngOnInit(): void {
    this.signInformGroup = this.fb.group({
      userName: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });

    this.subscriptions.push(
      this.getLoginProfile.subscribe((state) => {
        if (state) {
          this.loginProfile = state;
          console.log(state);
          const response = JSON.parse(
            window.atob(state.accessToken.split('.')[1])
          );
          console.log(response);

          this.tokenStorage.saveToken(state.accessToken);
          this.tokenStorage.saveRefreshToken(state.refreshToken);
          this.tokenStorage.saveUser(response);

          console.log( this.tokenStorage.getToken());

          setTimeout(() => {
            // <<<---using ()=> syntax
            if (response) {
              console.log(response);
              this.onNoClick();
              if (response.Role === 'User') {
                this.router.navigate(['/user/list']);
              } else if (response.Role === 'Admin') {
                this.router.navigate(['/admin/list']);
              }
            }
          }, 2000);
        }
      })
    );

    this.store.dispatch(LoginAction.initial());
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
      userName: 'man2001thcs',
      password: '123',
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
