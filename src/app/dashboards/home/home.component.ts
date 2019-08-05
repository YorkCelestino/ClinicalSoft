import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:rxjs-no-wholesale
import { Subscription, timer, BehaviorSubject } from 'rxjs';

import { LayoutService } from '../../layouts/layout.service';
import { UserService } from '../../apps/users/user.service';
import { AppointmentService } from '../../apps/appointment/appointment.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  doctors: any = [];
  availableDoctors: number;

  appointment: any = [];
  availableAppointmentToday: number;

  appointmentAll: any = [];
  availableAppointment: number;
  constructor(public layoutService: LayoutService, private uerService: UserService, private appointmentService: AppointmentService) { }

  ngOnInit(): void  {
    this.getUsers();
    this.getTodayAppointment();
    this.getAppointment();
  }

  getUsers(): any {
    this.uerService.getDoctors().subscribe(
      res => {
        this.doctors = res;
        this.availableDoctors = this.doctors.length;
      },
      err => console.error(err)
    );
  }
  getTodayAppointment (): any {
    this.appointmentService.getTodayAppointment().subscribe(
      res => {
        this.appointment = res;
        this.availableAppointmentToday = this.appointment.length;
      },
      err => {
        console.log(err);
      });
  }
  getAppointment (): any {
    this.appointmentService.getAppointments().subscribe(
      res => {
        this.appointmentAll = res;
        this.availableAppointment = this.appointmentAll.length;
      },
      err => {
        console.log(err);
      });
  }

}
