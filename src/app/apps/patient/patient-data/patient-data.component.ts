import { Component, OnInit, Optional, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PatientService } from '../patient.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { IPatient } from '../../../models/patient';


export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent {
  // tslint:disable-next-line:typedef
  myControl = new FormControl();
  options: string[] = ['Embarazo en adolencentes (Menor de 18 años)', 'Embarazo en madres mayores de 35 años', 'Puerperio'];
  optionsjefe: any = [];

  patiens: any = [];

  filteredOptions: Observable<string[]>;
  filteredOptionsjefe: Observable<string[]>; // variable de filtro
  patientGroupOptions: Observable<IPatient>; // vatiable para jefe de cada
  // work: boolean;
  // acta: boolean;
  // afiliado: boolean;
  // istheBossF: boolean;
  yesWork: boolean = true;
  noWork: boolean = false;

  public form: FormGroup;
  // tslint:disable-next-line:typedef
  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;



  constructor(

    private patientService: PatientService,
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<PatientDataComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.setForm();

  }
    // tslint:disable-next-line:one-line
    setForm(): void{
      this.form = this.fb.group({
        id: '',
        name: ['', Validators.required],
        surname: ['', Validators.required],
        idCard: ['', Validators.required],
        birthdate: ['', Validators.required],
        gender: ['', Validators.required],
        civilStatus: ['', Validators.required],
        actData: ['', Validators.required],
        districtMunicipality: '',
        numberOfOfficial: '',
        bookNumber: '',
        folioNumber: '',
        actNumber: '',
        yearBook: '',
        email: ['', Validators.required],
        cellPhone: ['', Validators.required],
        scholarship: ['', Validators.required],
        work: [ '', Validators.required],
        whereWork: '',
        workType: '',
        sdss: '',
        ars: '',
        regime: '',
        riskFactorsDiseases: '',
        admissionDate: '',
        egressDate: '',
      //  attend: ['', Validators.required],
        socialSecurityNumber: [''],
        isTheBoss: '',
        familyBossId: ''
      });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

   // funcion de filtro de jefe de familia
    this.filteredOptionsjefe = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filterjefe(value))
    );


  //  console.log(this.data);
  //  console.log(this.patiens);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }

  private _filterjefe(valuejefe: string): string[] { // funcion de filtro de jefe de familia
    const filterValuejefe = valuejefe.toLowerCase();

    return this.patiens.filter(optionjefe => optionjefe.toLowerCase().indexOf(filterValuejefe) === 0);
  }


  onClick(row: any): void {

    // si el valor del atributo work es VERDADERO se setea el formulario con el string "Si"
    if (this.form.value.work) {
      this.form.value.work = 'Si';
    } else {
      // si el valor del atributo work es FALSO O INDEFINIDO se setea el formulario con el string "No"
      this.form.value.work = 'No';
    }

    // si el valor del atributo actData es VERDADERO se setea el formulario con el string "Si"
    if (this.form.value.actData) {
      this.form.value.actData = 'Si';
    } else {
    // si el valor del atributo actData es FALSO O INDEFINIDO se setea el formulario con el string "No"
      this.form.value.actData = 'No';
    }
    // si el valor del atributo sdss es VERDADERO se setea el formulario con el string "Si"
    if (this.form.value.sdss) {
      this.form.value.sdss = 'Si';
      console.log(this.form.value);
    } else {
      // si el valor del atributo sdss es FALSO O INDEFINIDO se setea el formulario con el string "No"
      this.form.value.sdss = 'No';
      console.log(this.form.value);
    }

    this.patientService.addPatient(this.form.value)
    .subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );

    this.closeDialog();

  }

  getPatients(): void {
    this.patientService.getPatient().subscribe(
      res => {
        console.log(res);
        this.patiens = res;
      },
      err => console.error(err)
    );
  }

  closeDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }

}
