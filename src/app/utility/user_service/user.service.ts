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
  current_user: User;

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
    this.current_user = {
      id: Number(localStorage.getItem('id')) ?? 0,
      email: localStorage.getItem('account') ?? "",
      codeS: localStorage.getItem('codeS') ?? "",
      id_admin: Number(localStorage.getItem('is_admin')) ?? 0, 
    };
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(JSON.stringify(error)); // log to console instead

      // TODO: better job of transforming error for user consumption
      //this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  login(account: string, password: string): Observable<Response> {
    let post_body = {
      emailS: account,
      passwordS: password,
    };
    let post_body_en = this.hash.encrypted_string(post_body, this.password_key);

    return this.http
      .post<Response>(this.url, post_body_en, this.httpOptions)
      .pipe(
        catchError(this.handleError<Response>('Fetch user'))
      );
  }
}
