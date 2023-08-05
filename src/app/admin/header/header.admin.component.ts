import { User } from '../../model/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/utility/user_service/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderAdminComponent {
  constructor(private dialog: MatDialog, 
    private fb: FormBuilder) {}
  
  id = 0;
  searchFormGroup!: FormGroup;
  
  ngOnInit(): void {
    this.id = Number(localStorage.getItem('id')) ?? 0;
    console.log(localStorage.getItem('id'));

    this.searchFormGroup = this.fb.group({
      searchValue: [
        "",
        Validators.compose([
          Validators.minLength(2),
          Validators.maxLength(20),
          Validators.pattern(/^[a-z]{6,32}$/i),
        ]),
      ],
    });
  }

  formSubmit(): void {}
}
