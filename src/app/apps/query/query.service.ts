import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class QueryService {

  constructor(private http: HttpClient) { }

  getTreatmentPatient(): any {
    return this.http.get(environment.apiBaseUrl + '/treatmentPatient/all');
  }
}
