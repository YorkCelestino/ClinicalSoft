import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { ITpatient } from '../../models/treatmentPatient';


@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }



  // getting all Treatment Patient
  getTreatmentPatient(patId?: any): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/treatmentPatient/all', patId);
  }


  // adding new Treatment Patient
  addTreatmentPatient(treatmentPatient: any): Observable<any> {
    return this.http.post(environment.apiBaseUrl + '/treatmentPatient/add', treatmentPatient);
  }

  // updating Treatment Patient
  updateTreatmentPatient(treatmentPatient: any): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/treatmentPatient/edit', treatmentPatient);
  }


  // Change Status Treatment Patient
  changeStatus(isActive: boolean, id: string): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/treatmentPatient/change-status', { id: id, isActive: !isActive });
  }
}
