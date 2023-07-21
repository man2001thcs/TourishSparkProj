import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../../../utility/user_service/user.service';
import { HashService } from '../../../utility/user_service/hash.service';
import { Router } from '@angular/router';
import { timeout } from 'rxjs';
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
  private password_key = 'login_code_re';
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<LoginComponent>,
    private userService: UserService,
    private hash: HashService,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: DialogSignInData
  ) {}

  ngOnInit(): void {
    this.signInformGroup = this.fb.group({
      emailS: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(4),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
      passwordS: [
        '',
        Validators.compose([Validators.required, Validators.minLength(3)]),
      ],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  formReset(): void {
    this.signInformGroup.setValue({
      emailS: '',
      passwordS: '',
    });
  }

  formSubmit(): void {
    //console.log(this.signInformGroup.value);
    this.userService
      .login(
        this.signInformGroup.value.emailS,
        this.signInformGroup.value.passwordS
      )
      .pipe()
      .subscribe(async (user) => {
        //console.log(user);
        if (user.id === 1) {
          const saveData = () => {
            let user_data_array: any = this.hash.dencrypted_array(
              user.data,
              this.password_key
            );
            console.log(user_data_array);
            //console.log(this.userService.current_user);

            let user_info = JSON.parse(user_data_array.info_data);

            this.userService.current_user_info = {
              fullname: user_info.fullname,
              address: user_info.address,
              phone_number: user_info.phone_number,
              created: user_info.created,
              new: user_info.new,
              birthday: user_info.birthday,
            };

            this.userService.current_user = {
              id: 123,
              email: this.signInformGroup.value.emailS,
              codeS: user_data_array.codeS,
              id_admin: 0,
            };

            localStorage.setItem('account', this.signInformGroup.value.emailS);
            localStorage.setItem('codeS', user_data_array.codeS);
            localStorage.setItem('is_admin', user_info.is_admin);
            localStorage.setItem('id', user_info.id);
            localStorage.setItem('user_info', user_info);
          };

          await saveData();

          setTimeout(() => {
            // <<<---using ()=> syntax
            console.log('account: ' + localStorage.getItem('account'));
            if (localStorage.getItem('account')) {
              this.onNoClick();
              if (Number(localStorage.getItem('is_admin')) === 0) {
                this.router.navigate(['/user/list']);
              } else if (Number(localStorage.getItem('is_admin')) === 1) {
                this.router.navigate(['/admin/list']);
              }
            }
          }, 3000);
        } else {
          this.errorMessage =
            'Mật khẩu hoặc tài Khoản không đúng, vui lòng kiểm tra lại';
        }
      });
  }
}
