import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../log/login/login.component';
import { FormControl, FormGroup } from '@angular/forms';
import { OnInitEffects } from '@ngrx/effects';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private dialog: MatDialog) {}
  searchFormGroup!: FormGroup;

  ngOnInit(): void {
    this.searchFormGroup = new FormGroup({
      search: new FormControl()
  });
  }

  openDialog() {
    const ref = this.dialog.open(LoginComponent, {
      data: {
        title: 'Do you want to leave this page?',
      },
    });
    ref.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });

    return ref.afterClosed();
  }


  formSubmit(): void {}
}
