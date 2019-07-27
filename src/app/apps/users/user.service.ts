import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-destructuring-spacing
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { IUser } from '../../models/user';
import { environment } from '../../../environments/environment.prod';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) {
   }


   getUsers(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/user/users');
 }
   getRoles(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/role/all');
  }

   addUser(user: IUser): Observable<IUser> {
     return this.http.post(environment.apiBaseUrl + '/user/add-user', user);
   }

   updateUser(user: IUser): Observable<IUser> {
     return this.http.put(environment.apiBaseUrl + '/user/update-user', user);
   }

    changeStatus(isActive: boolean, id: string): Observable<any> {

        return this.http.put(environment.apiBaseUrl + '/user/change-status',
        { id: id, isActive: !isActive });

  }


}
