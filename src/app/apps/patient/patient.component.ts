import { Component, OnInit, ViewChild } from '@angular/core';

import { PatientDataComponent } from './patient-data/patient-data.component';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort } from '@angular/material';
import { PatientService } from './patient.service';
import { IPatient } from '../../models/patient';
@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  displayedColumns: string[] = ['name', 'surname', 'email', 'cellPhone', 'idCard',
  'civilStatus', 'actions'];
  dataSource: any;
  patient: any = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private patientservices: PatientService,
    public dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.getPatient();
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

  getPatient(): void {
    this.patientservices.getPatient().subscribe(
      res => {
        this.patient = res;
         console.log(this.patient);
        this.dataSource = new MatTableDataSource<IPatient>(this.patient);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.error(err);
      }
    );
  }

}
