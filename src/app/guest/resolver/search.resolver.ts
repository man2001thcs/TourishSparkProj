import { HttpParams, HttpParamsOptions, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { HttpClient } from '@microsoft/signalr';
import { Observable, of } from 'rxjs';
import { Book } from 'src/app/model/book';
import { Response } from 'src/app/model/response';
import { UserService } from 'src/app/utility/user_service/user.service';
@Injectable({
  providedIn: 'root'
})
export class SearchResolver {
  constructor(private userService: UserService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {


     let categoryList  = this.userService.getCategory(1, 5);

     let authorList  = this.userService.getAuthor(1, 5);

     let publisherList  = this.userService.getPublisher(1, 5);

     let data = {
      categoryList: categoryList,
      authorList: authorList,
      publisherList: publisherList
     }

     return of(data);
  }
}
