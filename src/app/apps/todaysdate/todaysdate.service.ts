import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IAppoinment } from '../../models/appointment';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodaysdateService {

  constructor(private http: HttpClient) { }

  getAppointments(): Observable<IAppoinment[]> {
    return this.http.get<IAppoinment[]>(environment.apiBaseUrl + '/appointment/all');
  }

}
