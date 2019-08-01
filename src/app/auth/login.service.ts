import { Injectable } from '@angular/core';
import { IUser } from '../models/user';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  selectedUser: IUser = {
    fullName: '',
    username: '',
    password: ''
  };

  // tslint:disable-next-line:typedef
  noAuthHeader = { headers: new HttpHeaders({'NoAuth': 'True'})};

  constructor(private http: HttpClient) { }

  // httpMethods
  getUserProfile(): Observable<IUser> {
    return this.http.get(environment.apiBaseUrl + '/user/get-user-profile');
  }


  // tslint:disable-next-line:typedef
  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/user/authenticate', authCredentials, this.noAuthHeader);
  }

  // helper methods

  // tslint:disable-next-line:typedef
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // tslint:disable-next-line:typedef
  getToken() {
    return localStorage.getItem('token');
  }

  // tslint:disable-next-line:typedef
  deleteToken() {
      localStorage.removeItem('token');
  }

  // tslint:disable-next-line:typedef
  getUserPlayload() {
    const token = this.getToken();

    if (token) {

        // tslint:disable-next-line:prefer-const
        let userPlayload = atob(token.split('.')[1]);
        return JSON.parse(userPlayload);
    } else {
      return null;
    }
  }

  // tslint:disable-next-line:typedef
  isloggedIn() {
     // tslint:disable-next-line:prefer-const
     let userPlayload = this.getUserPlayload();
     if (userPlayload) {
        return userPlayload.exp > Date.now() / 1000;
     } else {
        return false;
     }
  }
}
