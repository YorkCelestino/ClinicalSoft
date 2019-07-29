import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PatientService } from '../patient.service';
import { MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent{
 
  myControl = new FormControl();
  options: string[] = ['Embarazo en adolencentes (Menor de 18 años)', 'Embarazo en madres mayores de 35 años', 'Puerperio'];
  filteredOptions: Observable<string[]>;

  work: boolean;
  acta: boolean;
  afiliado: boolean;
  yesWork: boolean = true;
  noWork: boolean = false;
  

  public form: FormGroup;
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
  setForm(): void{
    this.form = this.fb.group({
      name: ['',Validators.required],
      surname: ['', Validators.required],
      idCard:['', Validators.required],
      birthdate:['', Validators.required],
      gender:['', Validators.required],
      civilStatus: ['', Validators.required],
      
        districtMunicipality: '',
        numberOfOfficial: '',
        bookNumber: '',
        folioNumber: '',
        actNumber: '',
        yearBook: '',
      
      email: ['', Validators.required],
      cellPhone:['', Validators.required],
      scholarship: ['', Validators.required],
      work:['', Validators.required],
      whereWork: '',
      sdss: '',
      ars: '',
      summary: '',
      riskFactorsDiseases: '',
      admissionDate: '',
      egressDate: '',
      attend:['', Validators.required], 
      socialSecurityNumber: ['']//, 
      //riskFactorsDiseases: [''],
      //admissionDate: [''],
     // egressDate: ['']
    });
}

  onClick(): void{
    console.log(this.form.value);
    
  }

  closeDialog(): void{
    this.form.reset();
    this.dialogRef.close();
  }

}
