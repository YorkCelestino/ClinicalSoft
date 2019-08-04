import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IAppoinment } from '../../models/appointment';
import { IUser } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  // getting all Apoiment
  getAppointments(): Observable<IAppoinment[]> {
    return this.http.get<IAppoinment[]>(environment.apiBaseUrl + '/appoinment/all');
  }

  // adding appointment
  addAppointments(appoinment: IAppoinment): Observable<IAppoinment[]> {
    return this.http.post<IAppoinment[]>(environment.apiBaseUrl + '/appoinment/add', appoinment  );
  }

  // updatting Appointment
  updateAppoinments(appoinment: IAppoinment): Observable<IAppoinment[]> {
    return this.http.post<IAppoinment[]>(environment.apiBaseUrl + '/appoinment/' , appoinment );
  }

  // Change Status Appointment
  changeStatus(isActive: boolean, id: string): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/appoinment/change-status',
    { id: id, isActive: !isActive });
  }

  getDoctor(): Observable<any> {
    return  this.http.get(environment.apiBaseUrl + '/user/get-doctors');
  }


}
