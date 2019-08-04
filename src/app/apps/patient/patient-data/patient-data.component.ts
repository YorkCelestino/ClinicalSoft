import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PatientService } from '../patient.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IPatient } from '../../../models/patient';
import { AutoCompleteOption } from '../../../shared/autocomplete/autocomplete.component';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent {
  // tslint:disable-next-line:typedef
  myControl = new FormControl();

  options: string[] = ['Embarazo en adolencentes (Menor de 18 años)', 'Embarazo en madres mayores de 35 años', 'Puerperio'];
  filteredOptions: Observable<string[]>;
  patientsFilterOptions: AutoCompleteOption<IPatient>[] = [];
  patients: IPatient[] = [];

 // yes: boolean = true; // variables para mostrar  o ocultar campos en el formulario
 // no: boolean = false;

  actCondition: boolean = false;
  workCondition: boolean = false;
  afiliadoCondition: boolean = false;
  isTheBossCondition: boolean = false;

  isLinear: boolean = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public form: FormGroup;



  constructor(

    private patientService: PatientService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientDataComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IPatient,
    private matSnackBar: MatSnackBar
  ) {
    this.setForm();

  }


  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  //  console.log(this.data);
    this.getPatients();
  }


  setForm(): void {
    if (!this.data.id) {
    this.form = this.fb.group({
      id: '',
      name: ['', Validators.required],
      surname: ['', Validators.required],
      idCard: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      civilStatus: ['', Validators.required],
      actData: [this.actCondition, Validators.required],
      districtMunicipality: '',
      numberOfOfficial: '',
      bookNumber: '',
      folioNumber: '',
      actNumber: '',
      yearBook: '',
      email: ['', Validators.required],
      cellPhone: ['', Validators.required],
      scholarship: ['', Validators.required],
      work: [ this.workCondition, Validators.required],
      whereWork: '',
      workType: '',
      sdss: this.afiliadoCondition,
      ars: '',
      regime: '',
      riskFactorsDiseases: '',
      admissionDate: '',
      egressDate: '',
    //  attend: ['', Validators.required],
      socialSecurityNumber: [''],
      isTheBoss:  this.isTheBossCondition,
      familyBossId: '',
      isActive: true
    });
   } else if (this.data.id) {

    this.form = this.fb.group({
      id: this.data.id,
      name: [this.data.name, Validators.required],
      surname: [this.data.surname, Validators.required],
      idCard: [this.data.idCard, Validators.required],
      birthdate: [this.data.birthdate, Validators.required],
      gender: [this.data.gender, Validators.required],
      civilStatus: [this.data.civilStatus, Validators.required],
      actData: [this.data.actData, Validators.required],
      districtMunicipality: this.data.districtMunicipality,
      numberOfOfficial: this.data.numberOfOfficial,
      bookNumber: this.data.bookNumber,
      folioNumber: this.data.folioNumber,
      actNumber: this.data.actNumber,
      yearBook: this.data.yearBook,
      email: [this.data.email, Validators.required],
      cellPhone: [this.data.cellPhone, Validators.required],
      scholarship: [this.data.scholarship, Validators.required],
      work: [this.data.work, Validators.required],
      whereWork: this.data.whereWork,
      workType: this.data.worType,
      sdss: this.data.sdss,
      ars: this.data.ars,
      regime: this.data.regime,
      riskFactorsDiseases: this.data.riskFactorsDiseases,
      admissionDate: this.data.admissionDate,
      egressDate: this.data.egressDate,
    //  attend: ['', Validators.required],
      socialSecurityNumber: this.data.socialSecurityNumber,
      isTheBoss: this.data.isTheBoss,
      familyBossId: this.data.familyBossId,
      isActive : this.data.isActive
    });
   }
}


  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  onValueChange($event: IPatient): void {

    this.form.value.familyBossId = $event.id;

  }

  addPatient(row: any): void {

    // // si el valor del atributo work es VERDADERO se setea el formulario con el string "Si"
    // if (this.form.value.work) {
    //   this.form.value.work = 'Si';
    // } else {
    //   // si el valor del atributo work es FALSO O INDEFINIDO se setea el formulario con el string "No"
    //   this.form.value.work = 'No';
    // }

    // // si el valor del atributo actData es VERDADERO se setea el formulario con el string "Si"
    // if (this.form.value.actData) {
    //   this.form.value.actData = 'Si';
    // } else {
    // // si el valor del atributo actData es FALSO O INDEFINIDO se setea el formulario con el string "No"
    //   this.form.value.actData = 'No';
    // }
    // // si el valor del atributo sdss es VERDADERO se setea el formulario con el string "Si"
    // if (this.form.value.sdss) {
    //   this.form.value.sdss = 'Si';
    //   console.log(this.form.value);
    // } else {
    //   // si el valor del atributo sdss es FALSO O INDEFINIDO se setea el formulario con el string "No"
    //   this.form.value.sdss = 'No';
    //   console.log(this.form.value);
    // }

  if (!this.data.id) {

    this.patientService.addPatient(this.form.value)
    .subscribe(
      res => {
        this.matSnackBar.open('Paciente Registrado con exito ', '', {
          duration: 3000,
        });
      },
      err => {
        this.matSnackBar.open('Error al registrar paciente ', '', {
          duration: 3000,
        });
      console.log(err);
      }
    );
  } else if (this.data.id) {
    console.log('updating ');

    this.patientService.updatePatient(this.form.value).subscribe(
      res => {
        this.matSnackBar.open('Paciente actualizado con exito ', '', {
          duration: 3000,
        });
      },
      err => {
        this.matSnackBar.open('Error al actualizar paciente ', '', {
          duration: 3000,
        });
      }
    );

  }

    //  console.log(this.form.value);

   this.closeDialog();

  }



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

  closeDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }

}
