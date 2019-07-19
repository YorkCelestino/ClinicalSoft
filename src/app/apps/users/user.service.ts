import { Injectable } from '@angular/core';
// tslint:disable-next-line:import-destructuring-spacing
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { IUsers } from '../../models/user';
import { environment } from '../../../environments/environment.prod';
import { FormGroup, FormControl, Validators } from '@angular/forms';
 import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class UserService {



  constructor(private http: HttpClient) {
   }

   form: FormGroup = new FormGroup({
      $key: new FormControl(null),
      fullName: new FormControl('', Validators.required),
      idCard: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      cellPhone: new FormControl('', [Validators.required, Validators.minLength(8)]),
      speciality: new FormControl('', Validators.required),
      userType: new FormControl('2')
   });

   initializeFormGroup(): void {
    this.form.setValue({
        $key: null,
        fullName: '',
        idCard: '',
        username: '',
        password: '',
        email: '',
        cellPhone: '',
        speciality: '',
        userType: '2'
    });
  }


   getUsers(): Observable<any> {
      return this.http.get(environment.apiBaseUrl + '/user/users');
   }

   addUser(user: IUsers): Observable<IUsers> {
     return this.http.post(environment.apiBaseUrl + '/user/add-user', user);
   }

   updateUser(user: IUsers): Observable<IUsers> {
     return this.http.put(environment.apiBaseUrl + '/user/update-user', user);
   }

   // tslint:disable-next-line:typedef
    populateForm(user: any) {
       this.form.setValue(_.omit(user, 'lastSeenAt', 'createdAt', 'saltSecret', 'isDelete', 'updatedAt', 'id'));
      // console.log(user);
    //   this.form.setValue({
    //     $key: user.$key,
    //     fullName: user.fullName,
    //     idCard: user.idCard,
    //     username: user.username,
    //     password: user.password,
    //     email: user.email,
    //     cellPhone: user.cellPhone,
    //     speciality: user.speciality,
    //     userType: user.userType
    // });
    }

}
