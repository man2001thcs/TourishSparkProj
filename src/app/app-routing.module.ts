import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanLoad } from '@angular/router';
import { CanLoadGuardAdmin } from './admin/guard/can-load.guard';
import { isAdminGuard } from './admin/guard/can-load.guard';
import { isGuestGuard } from './guest/guard/can-load-guest.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'guest/login',
    pathMatch: 'full',
  },
  {
    path: '',
    loadChildren: () =>
      import('./guest/guest.module/guest.module').then((m) => m.GuestModule),
    canLoad: [isGuestGuard],
    data :{permittedRoles:['New']}
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module/admin.module').then((m) => m.AdminModule),
    canLoad: [isAdminGuard],
    data :{permittedRoles:['Staff', 'Admin']}
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
