import { Component, OnInit } from '@angular/core';
import { PatientService } from '../patient/patient.service';
import { AppointmentService } from '../appointment/appointment.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { TreatmentService } from '../treatment/treatment.service';

export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}


const ELEMENT_DATA: PeriodicElement[] = [
  {position: 'GP', name: 'Gripe', weight: 1.0079, symbol: 'H'},
  {position: 'EB', name: 'Embarazo', weight: 4.0026, symbol: 'He'},
];
@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {

  todayAppointment: any = [];
  treatments: any  = [];

  prueva: any  = {};

  form: FormGroup;
  form1: FormGroup;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // tslint:disable-next-line:typedef
  dataSource = ELEMENT_DATA;

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private treatmentService: TreatmentService
    ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      idPatient : ['', Validators.required]
    });
    this.getAppointments();
    this.getTreatment();
  }

  // opteniendo las citas del dia
  getAppointments (): any {
    this.appointmentService.getTodayAppointment().subscribe(
      res => {
        this.todayAppointment = res;
        console.log(this.todayAppointment);
      },
      err => {
        console.error(err);
      }
    );
  }

  // opteniendo los tratamients
 getTreatment (): any {
   this.treatmentService.getTreatment().subscribe(
     res => {
        this.treatments = res;
     },
     err => {
       console.log(err);
     }
   );
 }

  onClick(treatment: any ): any {
    console.log(this.treatments);
  }


}
