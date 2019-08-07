import { Component, OnInit, ViewChild } from '@angular/core';
import { PatientService } from '../patient/patient.service';
import { AppointmentService } from '../appointment/appointment.service';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';
import { TreatmentService } from '../treatment/treatment.service';
import { QueryService } from './query.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { ITpatient } from '../../models/treatmentPatient';
import { AutoCompleteOption } from '../../shared/autocomplete/autocomplete.component';


export interface PeriodicElement {
  name: string;
  position: string;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  todayAppointment: any = [];
  treatments: any = [];

  treatmentPatient: any = [];
  searchKey: any;
  form: FormGroup;

  displayedColumns: string[] = ['codeTreatment', 'idPatient', 'nameTreatment', 'price', 'actions'];
  // tslint:disable-next-line:typedef
  dataSource: any;

  FilterOptions: AutoCompleteOption<ITpatient>[] = [];
  patient: ITpatient[] = [];
  patId: any;

  constructor(
    private patientService: PatientService,
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private treatmentService: TreatmentService,
    private  queryService: QueryService
    ) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: this.patId,
      idPatient : '',
      idTreatment : ''
    });

    this.getAppointments();
    this.getTreatment();
  }

  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onSearchClear(): void  {
    this.searchKey = '';
    this.applyFilter('');
  }


  onValueChange($event: ITpatient): void {

    // this.form.value.idUser = $event.id;
    // console.log($event.id);
    // console.log(this.form.value);
     console.log($event);
     this.patId = $event;

    // this.setForm();

  }


  // opteniendo las citas del dia
  getAppointments (): any {
    this.appointmentService.getTodayAppointment().subscribe(
      res => {
        this.todayAppointment = res;
        console.log(this.todayAppointment.idPatient);

        this.FilterOptions = this.todayAppointment.map(val => {
          return {
            title: val.idPatient.name,
            data: val
          };
        });

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
      // console.log(err);
     }
   );
 }
  // opteniendo los tratamients con paciente selecsionado
  getTreatmentPatients(): any {
   this.queryService.getTreatmentPatient(this.patId).subscribe(
     res => {
        this.treatmentPatient = res;
        this.dataSource = new MatTableDataSource<ITpatient>(this.treatmentPatient);
        this.dataSource.paginator = this.paginator;
     },
     err => {
       console.log(err);
     }
   );
 }

   addTreatmentPatients(): any {
     this.queryService.addTreatmentPatient(this.form.value).subscribe(
       res => {
        this.getTreatmentPatients();
       },
       err => console.log(err)
     );
   }
   changeStatus(isActive: boolean, id: string): any {
     this.queryService.changeStatus(isActive, id).subscribe(
       res => {
        this.getTreatmentPatients();
       },
       err => console.log(err)
     );
   }

  onClick(): any {
    console.log(this.form.value);
  }


}
