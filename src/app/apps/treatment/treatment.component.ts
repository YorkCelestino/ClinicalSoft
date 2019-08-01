import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material';
import { TreatmentDataComponent } from './treatment-data/treatment-data.component';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }
  openDialog(data: any = {}): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = data ? data : undefined;

    const dialogRef = this.dialog.open(TreatmentDataComponent, dialogConfig);
  }
  ngOnInit(): void {
  }

}
