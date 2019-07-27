import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IPatient } from '../../models/patient';

@Injectable({
  providedIn: 'root'
})
export class PatientService {


  constructor(private http: HttpClient) { }

  getPatient(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/patient/patients');
 }
}
