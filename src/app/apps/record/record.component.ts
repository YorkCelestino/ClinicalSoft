import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { RecordService } from './record.service';
import { IPatient } from '../../models/patient';
import { PatientDataComponent } from '../patient/patient-data/patient-data.component';
import { Router } from '@angular/router';
import { RecordDataComponent } from './record-data/record-data.component';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
export class RecordComponent implements OnInit {
  displayedColumns: string[] = ['name', 'surname', 'cellPhone', 'idCard', 'actions'];
  dataSource: any;
  patient: IPatient[] = [];
  patients: IPatient[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: any;
  constructor(
    private recordservice: RecordService,
    public dialog: MatDialog,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getPatient();
  }

  openDialog(data: any = {}): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';

    dialogConfig.data = data ? data : undefined;

    const dialogRef = this.dialog.open(PatientDataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
    //  console.log('The dialog was closed');
      this.getPatient();
    });
  }

  getPatient(): void {
    this.recordservice.getPatient().subscribe(
      res => {
        this.patient = res;
        // console.log(this.patient);
        this.dataSource = new MatTableDataSource<IPatient>(this.patient);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.error(err);
      }
    );
  }
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


  getPatientsData(): void {
    this.recordservice.getPatient().subscribe(
      res => {
        this.patients = res;
        // console.log(this.patient);
        this.dataSource = new MatTableDataSource<IPatient>(this.patient);
        this.dataSource.paginator = this.paginator;
      },
      err => {
        console.error(err);
      }
    );
  }

  onSearchClear(): void  {
    this.searchKey = '';
    this.applyFilter('');
  }

  onLogut(): void {
    // this.loginService.deleteToken();
    this.router.navigateByUrl('/external/recorddata');
}

openDialogRecord(data: any = {}): void {
  const dialogConfig = new MatDialogConfig();
  // dialogConfig.disableClose = true;
  // dialogConfig.autoFocus = true;
  dialogConfig.width = '90%';

  dialogConfig.data = data ? data : undefined;

  const dialogRef = this.dialog.open(RecordDataComponent, dialogConfig);

  dialogRef.afterClosed().subscribe(result => {
  //  console.log('The dialog was closed');
    this.getPatient();
  });
}


}
