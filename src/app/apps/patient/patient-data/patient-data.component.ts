import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PatientService } from '../patient.service';
import { MatDialogRef } from '@angular/material';
// tslint:disable-next-line:rxjs-no-wholesale
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

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

  workp: boolean;
  acta: boolean;
  afiliado: boolean;
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
    public dialogRef: MatDialogRef<PatientDataComponent>
  ) {
    this.setForm();
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
  }
  // tslint:disable-next-line:one-line
  setForm(): void{
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      idCard: ['', Validators.required],
      birthdate: ['', Validators.required],
      gender: ['', Validators.required],
      civilStatus: ['', Validators.required],
      districtMunicipality: '',
      numberOfOfficial: '',
      bookNumber: '',
      folioNumber: '',
      actNumber: '',
      yearBook: '',
      email: ['', Validators.required],
      cellPhone: ['', Validators.required],
      scholarship: ['', Validators.required],
      work: ['', Validators.required],
      whereWork: '',
      sdss: '',
      ars: '',
      summary: '',
      riskFactorsDiseases: '',
      admissionDate: '',
      egressDate: '',
      attend: ['', Validators.required],
      socialSecurityNumber: ['']//
      // tslint:disable-next-line:comment-format
      //riskFactorsDiseases: [''],
      // tslint:disable-next-line:comment-format
      //admissionDate: [''],
     // egressDate: ['']
    });
}

  onClick(): void {
    console.log(this.form.value);
  }

  closeDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }

}
