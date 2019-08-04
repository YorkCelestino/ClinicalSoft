import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { IPatient } from '../../models/patient';

@Injectable({
  providedIn: 'root'
})
export class RecordService {
  
  constructor(private http: HttpClient) { }
  getPatient(): Observable<IPatient[]> {
    return this.http.get<IPatient[]>(environment.apiBaseUrl + '/patient/all');
 }
}
