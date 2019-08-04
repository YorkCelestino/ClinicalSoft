// components
import { Component, OnInit, ViewChild, Inject, Optional } from '@angular/core';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
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
  doctors: any[] = [];

  // patient filter optios and array object of patient
  patientsFilterOptions: AutoCompleteOption<IPatient>[] = [];
  patients: IPatient[] = [];


  dataSource: any;

  form: FormGroup;

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

  onValueChangeDoctors($event: IUser): void {

    this.form.value.idUser = $event.id;
    console.log($event.id);
    console.log(this.form.value);

  }

  onValueChangePatient($event: IUser): void {

    this.form.value.idPatient = $event.id;
    console.log($event.id);
    console.log(this.form.value);

  }

  setForm(): void {
    this.form = this.fb.group({
      id: '',
      idUser: '',
      idPatient: '',
      appointmentDate: '',
      observations: '',
      cellPhoneSend: false,
      emailSend: false,
      isActive: true
    });
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
 // if (!this.data.id) {

  this.appointmentService.addAppointments(this.form.value).subscribe(
    res => {
      this.matSnackBar.open('Cita Registrada con exito', '', {
        duration : 3000
      });
      this.closeDialog();
    },
    err => {
      this.matSnackBar.open('Error al registrar la cita', '', {
        duration: 3000
      });
      console.error(err);
    }
  );
// } else if (this.data.id) {
//   this.appointmentService.updateAppoinments(this.form.value).subscribe(
//     res => {
//       this.matSnackBar.open('Cita actualizada con exito', '' , {
//           duration: 3000
//       });
//       this.closeDialog();
//     },
//     err => {
//       this.matSnackBar.open('Error al  actualizadar cita', '' , {
//         duration: 3000
//     });
//       console.error(err);

//     }
//   );
// }
}


closeDialog(): void {
   this.form.reset();
  this.dialogRef.close();
}
}
