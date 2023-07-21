import { User } from '../../model/user';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/utility/user_service/user.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderAdminComponent {
  constructor(private dialog: MatDialog, private userService: UserService) {}
  id = 0;
  ngOnInit(): void {
    this.id = Number(localStorage.getItem('id')) ?? 0;
    console.log(localStorage.getItem('id'));
  }
}
