import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { BookUserlistComponent } from '../booklist/book-user-list.component';
import { BookUserDetailComponent } from '../book-detail/book-user-detail.component';
import { MainUserComponent } from '../main/main.user.component';
import { RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: MainUserComponent, // <== this is an array, we can have multiple guards
    children: [
      {
        path: 'list',
        component: BookUserlistComponent,
      },
      {
        path: 'detail/:id',
        component: BookUserDetailComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRouterModule {}
