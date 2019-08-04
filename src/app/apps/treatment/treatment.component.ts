import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogConfig, MatDialog, MatSort, MatPaginator, MatTableDataSource } from '@angular/material';
import { TreatmentDataComponent } from './treatment-data/treatment-data.component';
import { ITreatment } from '../../models/treatment';
import { TreatmentSService } from './treatment-s.service';

@Component({
  selector: 'app-treatment',
  templateUrl: './treatment.component.html',
  styleUrls: ['./treatment.component.scss']
})
export class TreatmentComponent implements OnInit {


  @ViewChild(MatSort) sort: MatSort;

  
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['code', 'name', 'price', 'doctorCommission','description','actions'];
  listData: MatTableDataSource<any>;
  dataSource: any;
  treatment : any = [];
  searchKey: string;

  constructor(
    public dialog: MatDialog,
    private treatmentdervice: TreatmentSService
  ) { }
  openDialog(data: any = {}): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '40%';

    dialogConfig.data = data ? data : undefined;

    const dialogRef = this.dialog.open(TreatmentDataComponent, dialogConfig);
  }
  onSearchClear(): void  {
    this.searchKey = '';
    //this.applyFilter('');
  }
  ngOnInit(): void {
  }

  getAppoinment(): void{
    this. treatmentdervice.getTreatment().subscribe(
      res => {
        this.treatment = res;
        this.dataSource = new MatTableDataSource<ITreatment>(this.treatment);

      }
    )
  }
}
