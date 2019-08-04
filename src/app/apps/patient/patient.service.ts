import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPatient } from '../../models/patient';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { type } from 'os';

@Injectable({
  providedIn: 'root'
})
export class PatientService {



  constructor(
    private http: HttpClient,

    ) { }

    // getting one patient
  getPatient(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/patient/all');
 }
 // adding pattient
  addPatient(patient: any): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/patient/add', patient);
 }

  // update patient
  updatePatient(patient: IPatient ): Observable<IPatient> {
    return this.http.put(environment.apiBaseUrl + '/patient/update', patient );
 }

 changeStatus(isActive: boolean, id: string): Observable<any> {

  return this.http.put(environment.apiBaseUrl + '/patient/change-status',
  { id: id, isActive: !isActive });

}
}
