import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-destructuring-spacing
import {environment} from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { IUsers } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
   }

   getUsers(): Observable<IUsers> {
      return this.http.get(environment.apiBaseUrl + '/user/users');
   }

}
