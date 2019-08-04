import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../layouts/layout.service';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig, MatTableDataSource } from '@angular/material';
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

  displayedColumns: string[] = ['user', 'patient', 'date', 'observations','actions'];
  listData: MatTableDataSource<any>;
  dataSource: any;
  appoinment : any = [];
  searchKey: string;
  ;
  constructor(
    private appoinmentservices: AppointmentService,
    public dialog: MatDialog
    ) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '32%';
    const dialogRef = this.dialog.open(AppointmentDataComponent, dialogConfig);
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  onSearchClear(): void  {
    this.searchKey = '';
    //this.applyFilter('');
  }

  getAppoinment(): void{
    this.appoinmentservices.getAppointment().subscribe(
      res => {
        this.appoinment = res;
        this.dataSource = new MatTableDataSource<IAppoinment>(this.appoinment);

      }
    )
  }

}
