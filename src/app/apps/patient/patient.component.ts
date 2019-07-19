import { Component, OnInit, ViewChild } from '@angular/core';

import { PatientDataComponent } from './patient-data/patient-data.component';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort } from '@angular/material';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    const dialogRef = this.dialog.open(PatientDataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
