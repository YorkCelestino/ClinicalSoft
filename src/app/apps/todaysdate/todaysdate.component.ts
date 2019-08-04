import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig } from '@angular/material';
import { IAppoinment } from '../../models/appointment';
import { TodaysdateService } from './todaysdate.service';
import { AppointmentDataComponent } from '../appointment/appointment-data/appointment-data.component';

@Component({
  selector: 'app-todaysdate',
  templateUrl: './todaysdate.component.html',
  styleUrls: ['./todaysdate.component.scss']
})
export class TodaysdateComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['user', 'patient', 'appointmentDate', 'observations', 'actions'];
  listData: MatTableDataSource<any>;
  dataSource: any;
  appoinment: IAppoinment[] = [];
  searchKey: string;

  constructor
  (
    private todaysdateservice: TodaysdateService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.getAppoinment;
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

  onSearchClear(): void  {
    this.searchKey = '';
    // this.applyFilter('');
  }

  getAppoinment(): void {
    this.todaysdateservice.getAppointments().subscribe(
      res => {
        this.appoinment = res;
        this.dataSource = new MatTableDataSource<IAppoinment>(this.appoinment);

      },
      err => {
        console.error(err);
      }
    );
  }
}