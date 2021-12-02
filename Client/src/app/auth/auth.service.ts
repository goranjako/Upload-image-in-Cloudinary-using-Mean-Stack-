import { Injectable, ErrorHandler } from '@angular/core';
import {  HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sweetalert2Service } from 'src/app/shared/swal.service';
import jwt_decode from "jwt-decode";
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',

  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiURL;
  constructor(private http: HttpClient, private toast: Sweetalert2Service) {
    this.apiURL = environment.api;}

  register(user:User): Observable<User> {
    return this.http.post<User>(this.apiURL +'/register', user);
  }


  login(authCredentials: any) {
    return this.http.post<any>(this.apiURL +'/login', authCredentials)
        .pipe(map(user => {
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('token', JSON.stringify(user));
            }
            return user;
        }));
}

getUser(id:any): Observable<any> {
  return this.http.get<any>(this.apiURL +'/user' + id)
  .pipe(
    retry(1),
    catchError(this.errorHandl)
  );
}

logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.toast.show('success', 'You have been successfully logged out' );
}


getToken() {
   const token = localStorage.getItem('token');
  const decode = jwt_decode(token!);
  return decode;

}
public isLoggedIn() {
  return localStorage.getItem('token') !== null;

}

errorHandl(error: { error: string; status: any; message: any; }) {
  let errorMessage = '';
  if (error instanceof ErrorEvent) {
    // Get client-side error
    errorMessage = error.error;
  } else {
    // Get server-side error
    errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
  }
  console.log(errorMessage);
  return throwError(errorMessage);
}
}
