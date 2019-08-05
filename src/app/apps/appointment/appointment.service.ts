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
    return this.http.get<IAppoinment[]>(environment.apiBaseUrl + '/appointment/all');
  }

  // adding appointment
  addAppointments(appointment: IAppoinment): Observable<IAppoinment[]> {
    // tslint:disable-next-line:prefer-const
    let fecha = appointment.appointmentDate.toLocaleDateString();
    console.log(fecha);
    appointment.appointmentDate = fecha;
    return this.http.post<IAppoinment[]>(environment.apiBaseUrl + '/appointment/add', appointment  );
  }

  // updatting Appointment
  updateAppoinments(appointment: IAppoinment): Observable<IAppoinment[]> {
    return this.http.put<IAppoinment[]>(environment.apiBaseUrl + '/appointment/edit' , appointment );
  }

  // Change Status Appointment
  changeStatus(isActive: boolean, id: string): Observable<any> {
    return this.http.put(environment.apiBaseUrl + '/appointment/change-status',
    { id: id, isActive: !isActive });
  }

  getDoctor(): Observable<any> {
    return  this.http.get(environment.apiBaseUrl + '/user/get-doctors');
  }

  getTodayAppointment(): Observable<any> {
    return this.http.get(environment.apiBaseUrl + '/appointment/today-date');
  }


}
