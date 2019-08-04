import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { TreatmentDataComponent } from './treatment-data/treatment-data.component';
import { ITreatment } from '../../models/treatment';
import { TreatmentService } from './treatment.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;


  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['code', 'name', 'price', 'doctorCommission', 'description', 'actions'];
  listData: MatTableDataSource<any>;
  dataSource: any;
  treatment: any = [];
  searchKey: string;

  constructor(
    public dialog: MatDialog,
    private treatmentdervice: TreatmentService
  ) { }
  openDialog(data: any = {}): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = data ? data : undefined;

    const dialogRef = this.dialog.open(TreatmentDataComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
       this.getTreatment();
     });
  }
  applyFilter(filterValue: string): void {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  onSearchClear(): void  {
    this.searchKey = '';
    // this.applyFilter('');
  }
  ngOnInit(): void {
    this.getTreatment();
  }

  getTreatment(): void {
    this. treatmentdervice.getTreatment().subscribe(
      res => {
        this.treatment = res;
        this.dataSource = new MatTableDataSource<ITreatment>(this.treatment);
        this.dataSource.paginator = this.paginator;

      },
      err => {
        console.error(err);
      }
    );
  }

  changeStatus(isActive: boolean, id: string): void {
    this.treatmentdervice.changeStatus(isActive, id).subscribe(
      res => {
        this.getTreatment();
        console.log(res);
      },
      err => {console.error(err);
      }
    );
}
}
