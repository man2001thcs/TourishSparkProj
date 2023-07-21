import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AdminService } from '../service/admin.service';
import { Book } from 'src/app/model/book';
import { Response } from 'src/app/model/response';
@Injectable({
  providedIn: 'root'
})
export class EditDetailResolver implements Resolve<Book> {
  constructor(private adminService: AdminService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
    console.log("resolved");
    return this.adminService.getBook(route.paramMap.get('id')!);
  }
}
