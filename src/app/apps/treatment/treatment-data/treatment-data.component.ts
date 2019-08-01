import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-treatment-data',
  templateUrl: './treatment-data.component.html',
  styleUrls: ['./treatment-data.component.scss']
})
export class TreatmentDataComponent implements OnInit {

  public form: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<TreatmentDataComponent>
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    // this.form.reset();
    this.dialogRef.close();
  }

}
