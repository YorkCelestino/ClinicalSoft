import { Component, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../../layouts/layout.service';
import { MatPaginator, MatSort, MatDialog, MatDialogConfig } from '@angular/material';
import { AppointmentDataComponent } from './appointment-data/appointment-data.component';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(
    public layoutService: LayoutService, 
    public dialog: MatDialog
    ) { }

  ngOnInit() {
  }
  openDialog(): void {
    const dialogConfig = new MatDialogConfig();
   // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '65%';
    const dialogRef = this.dialog.open(AppointmentDataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
