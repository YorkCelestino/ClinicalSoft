import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITreatment } from '../../../models/treatment';
import { TreatmentService } from '../treatment.service';
import { duration } from 'moment';

@Component({
  selector: 'app-treatment-data',
  templateUrl: './treatment-data.component.html',
  styleUrls: ['./treatment-data.component.scss']
})
export class TreatmentDataComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TreatmentDataComponent>,
    private treatmentService: TreatmentService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ITreatment,
    private matSnackBar: MatSnackBar,
    private fb: FormBuilder
  ) {
    this.setForm();
  }

  ngOnInit(): void {

  }

  setForm(): void {
    if (!this.data.id) {
      this.form = this.fb.group({
          id: '',
          code: ['', Validators.required],
          name: ['', Validators.required],
          price: [null, Validators.required],
          doctorCommission: [null, Validators.required],
          description: '',
          isActive: true
        });
    } else if (this.data.id) {
      this.form = this.fb.group({
          id: this.data.id,
          code: this.data.code,
          name: this.data.name,
          price: this.data.price,
          doctorCommission: this.data.doctorCommission,
          description: this.data.description,
          isActive: this.data.isActive
        });
    }
  }

  addTreatment(): void  {
    if (!this.data.id) {
      this.treatmentService.addTreatement(this.form.value).subscribe(
        res => {
          this.matSnackBar.open('Tratamiento registrado con exito', '', {
            duration: 3000
          });
          this.closeDialog();

        },
        err => {
          this.matSnackBar.open('Error al registrar Tratamiento', '', {
            duration: 3000
          });
          this.closeDialog();

          console.log(err);
        }
      );
    } else  if (this.data.id) {
      this.treatmentService.updateTreatement(this.form.value).subscribe(
        res => {
          this.matSnackBar.open('Tratamiento Actualizado con exito', '', {
            duration: 3000
          });
          this.closeDialog();
        },
        err => {
          this.matSnackBar.open('Error al Actualizar Tratamiento', '', {
            duration: 3000
          });
          this.closeDialog();
          console.log(err);
        }
      );
    }
  }

  closeDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }

}
