// components
import { Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { MatPaginator, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AutoCompleteOption } from '../../../shared/autocomplete/autocomplete.component';

// interfaces
import { IAppoinment } from '../../../models/appointment';
import { IUser } from '../../../models/user';
import { IPatient } from '../../../models/patient';

// services
import { UserService } from '../../users/user.service';
import { PatientService } from '../../patient/patient.service';
import { AppointmentService } from '../appointment.service';

@Component({
  selector: 'app-appointment-data',
  templateUrl: './appointment-data.component.html',
  styleUrls: ['./appointment-data.component.scss']
})
export class AppointmentDataComponent implements OnInit {

  // user filter optios and array object of user
  doctorsFilterOptions: AutoCompleteOption<IUser>[] = [];
  doctors: IUser[] = [];

  // patient filter optios and array object of patient
  patientsFilterOptions: AutoCompleteOption<IPatient>[] = [];
  patients: IPatient[] = [];


  dataSource: any; // filtro de la tabla de datos
  searchKey: string; // para el filtro dela tabla de datos
  form: FormGroup;

  // variables para guardar los Id de Doctor y Pacientes filtrados
  docId: string;
  patId: string;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public dialogRef: MatDialogRef<AppointmentDataComponent>,
    private userService: UserService,
    private patientService: PatientService,
    private fb: FormBuilder,
    private appointmentService: AppointmentService,
    private matSnackBar: MatSnackBar,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IAppoinment,

  ) {
   this.setForm();
  }

  ngOnInit(): void {
    this.getPatients();
    this.getDoctors();


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

  onValueChangeDoctors($event: IUser): void {

    // this.form.value.idUser = $event.id;
    // console.log($event.id);
    // console.log(this.form.value);
    // console.log($event);
    this.docId = $event.id;

    this.setForm();


  }

  onValueChangePatient($event: IPatient): void {

    // this.form.value.idPatient = $event.id;
    // console.log($event);
    // console.log(this.form.value);
    this.patId = $event.id;
    this.setForm();

  }

  setForm(): void {
    if (!this.data.id) {

    this.form = this.fb.group({
      id: '',
      idUser: [this.docId, Validators.required],
      idPatient: [this.patId, Validators.required],
      appointmentDate: ['', Validators.required],
      observations: [''],
      cellPhoneSend: false,
      emailSend: false,
      isActive: true
    });
  } else if (this.data.id) {

    this.form = this.fb.group({
      id: this.data.id,
      idUser: this.data.idUser.id,
      idPatient: this.data.idPatient.id,
      appointmentDate: this.data.appointmentDate,
      observations: this.data.observations,
      cellPhoneSend: this.data.cellPhoneSend,
      emailSend: this.data.emailSend,
      isActive: this.data.isActive
    });
  }
  }


// getting user for filter

getDoctors(): void {
  this.appointmentService.getDoctor().subscribe(
    res => {
      this.doctors = res;
      this.doctorsFilterOptions = this.doctors.map(val => {
        return {
          title: val.fullName,
          data: val
        };
      });
    },
    err => console.log(err)

  );
}

// getting Pattient for filter

getPatients(): void {
  this.patientService.getPatient().subscribe(
    res => {
     // console.log(res);
      this.patients = res;
      this.patientsFilterOptions = this.patients.map(val => {
        return {
          title: val.name,
          data: val
        };
      });
    },
    err => console.error(err)
  );
}


// adding new  Appointment

addAppointments(): void {
  if (!this.data.id) {
    this.appointmentService.addAppointments(this.form.value).subscribe(
      res => {
        this.matSnackBar.open('Cita registrada con exito', '', {
            duration: 3000
        });

      },
       err => {
      this.matSnackBar.open('Error al deshabilitar Cita', '', {
        duration: 3000
      });
      console.error(err);

      });
  } else if (this.data.id) {
    this.appointmentService.updateAppoinments(this.form.value).subscribe(
      res => {
        this.matSnackBar.open('Cita actualizada con exito', '', {
          duration: 3000
        });
      },
      err => {
        this.matSnackBar.open('Error al Actualizar Cita', '', {
          duration: 300
        });
        console.error(err);


      }
    );
  }
  this.closeDialog();
}


closeDialog(): void {
   this.form.reset();
  this.dialogRef.close();
}
}
