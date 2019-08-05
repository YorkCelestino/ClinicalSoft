import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../layouts/layout.service';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatTableDataSource, MatSnackBar } from '@angular/material';
import { AppointmentDataComponent } from './appointment-data/appointment-data.component';
import { AppointmentService } from './appointment.service';
import { IAppoinment } from '../../models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;
  dataSource: any;

  displayedColumns: string[] = ['user', 'patient', 'appointmentDate', 'observations', 'actions'];
  listData: MatTableDataSource<any>;

  appoinment: IAppoinment[] = [];


  constructor(
    private appoinmentservices: AppointmentService,
    public dialog: MatDialog,
    public matSnackBar: MatSnackBar
    ) { }

  ngOnInit(): void {
    this.getAppoinment();
  }


  openDialog(data: any = {}): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '32%';

    dialogConfig.data = data ? data : undefined;

    const dialogRef = this.dialog.open(AppointmentDataComponent, dialogConfig);


    dialogRef.afterClosed().subscribe(result => {
       this.getAppoinment();
     });
  }

  getAppoinment(): void {
    this.appoinmentservices.getAppointments().subscribe(
      res => {
        this.appoinment = res;
        this.dataSource = new MatTableDataSource<IAppoinment>(this.appoinment);
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
  onSearchClear(): void  {
    this.searchKey = '';
    this.applyFilter('');
  }


  changeStatus(isActive: boolean, id: string): void {
    this.appoinmentservices.changeStatus(isActive, id).subscribe(
      res => {
        this.getAppoinment();
        this.matSnackBar.open('Cita deshabilitado con exito', '', {
          duration: 3000
        });
      },
      err => {
        this.matSnackBar.open('Error deshabilitar al deshabilitar Cita', '', {
          duration: 3000
        });
        console.error(err);
      }
    );


  }
}
