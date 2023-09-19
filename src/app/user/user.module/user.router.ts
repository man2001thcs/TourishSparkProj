import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';

import { MainUserComponent } from '../main/main.user.component';
import { RouterModule } from '@angular/router';
import { BookDetailComponent } from '../book-detail/book-detail.component';
import { HomeComponent } from '../home/home.component';
import { SearchComponent } from '../search/search.component';
import { SearchResolver } from '../resolver/search.resolver';
import { CartComponent } from '../cart/cart.component';


const routes: Routes = [
  {
    path: '',
    component: MainUserComponent, // <== this is an array, we can have multiple guards
    children: [
      {
        path: 'detail/:id',
        component: BookDetailComponent,
      },
      {
        path: "home",
        component: HomeComponent,
      },
      {
        path: "cart",
        component: CartComponent,
      },
      {
        path: "search",
        component: SearchComponent,
        resolve: {
          data: SearchResolver, // <== key: value (service or Dependency injection token)
        },
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
