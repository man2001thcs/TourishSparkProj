import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../log/login/login.component';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) {}

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
}
