import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../patient.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-patient-data',
  templateUrl: './patient-data.component.html',
  styleUrls: ['./patient-data.component.scss']
})
export class PatientDataComponent implements OnInit {

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
    
  }
  setForm(): void{
    this.form = this.fb.group({
      name: ['',Validators.required],
      surname: ['', Validators.required],
      email: ['', Validators.required],
      cellPhone:['', Validators.required],
      idCard:['', Validators.required],
      civilStatus: ['Soltero', Validators.required],
      gender:['', Validators.required],
      birthdate:['', Validators.required],
      scholarship: ['', Validators.required],
      attend:['', Validators.required],
      work:['', Validators.required], 
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
