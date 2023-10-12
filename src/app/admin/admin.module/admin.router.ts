import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { BookDetailAdminComponent } from '../book-detail/book-detail_admin.component';

import { AdminMainComponent } from '../main/admin.main.component';
import { CanEditAdminGuard } from '../guard/edit-admin-guard.guard';
import { CanLeaveEditGuard, canLeaveSiteGuard } from '../guard/can-leave-edit.guard';
import { RouterModule } from '@angular/router';

import { EditDetailResolver } from '../resolver/edit-detail.resolver';
import { BookCreateAdminComponent } from '../book-create/book-create_admin.component';
import { BookListAdminComponent } from '../book-list/bookList_admin.component';
import { PassengerCarListComponent } from '../PassengerCar/passenger_car_list/passenger_car-list.component';
import { AirPlaneListComponent } from '../AirPlane/air_plane_list/air_plane-list.component';
import { HotelListComponent } from '../Hotel/hotel_list/hotel-list.component';
import { RestaurantListComponent } from '../Restaurant/restaurant_list/restaurant-list.component';
import { HomeStayListComponent } from '../HomeStay/homeStay_list/homeStay-list.component';


const routes: Routes = [
  {
    path: '',
    component: AdminMainComponent,
    children: [
      // other configurations
      {
        path: 'book/detail/:id/edit',
        component: BookDetailAdminComponent,
        canActivate: [CanEditAdminGuard], // <== this is an array, we can have multiple guards
        canDeactivate: [CanLeaveEditGuard],
      },
      {
        path: 'book/create',
        component: BookCreateAdminComponent,
        canActivate: [CanEditAdminGuard], // <== this is an array, we can have multiple guards
        canDeactivate: [canLeaveSiteGuard],
      },
      {
        path: 'transport/passenger-car/list',
        component: PassengerCarListComponent,
      },
      {
        path: 'transport/air-plane/list',
        component: AirPlaneListComponent,
      },
      {
        path: 'resthouse/hotel/list',
        component: HotelListComponent,
      },
      {
        path: 'resthouse/homeStay/list',
        component: HomeStayListComponent,
      },
      {
        path: 'restaurant/list',
        component: RestaurantListComponent,
      },
      
      {
        path: 'book/list',
        component: BookListAdminComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRouter {}
