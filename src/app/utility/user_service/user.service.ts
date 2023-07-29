import { Injectable } from '@angular/core';
import { User, User_Info } from '../../model/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Response } from '../../model/response';
import { Observable, of, map, catchError, filter } from 'rxjs';
import { HashService } from './hash.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  current_user_info!: User_Info;

  private password_key = 'login_code_re';
  private url = '/api/controller/user/login.php';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }),
  };
  constructor(private http: HttpClient, private hash: HashService) {
  
  }


  public decodeToken () {

  }

  // var payLoad = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
}
