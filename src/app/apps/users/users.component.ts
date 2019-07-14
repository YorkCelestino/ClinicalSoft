import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort } from '@angular/material';
import { UserService } from './user.service';
import { IUsers } from '../../models/user';
import { UsersDataComponent } from './users-data/users-data.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listData: MatTableDataSource<any>;
  users: any = [];
  displayedColumns: string[] = ['fullName', 'idCard', 'username', 'email', 'cellPhone', 'speciality', 'userType', 'actions'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(private userservices: UserService, public dialog: MatDialog) { }

  // material dialog
  openDialog(): void {
    this.userservices.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    const dialogRef = this.dialog.open(UsersDataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
      this.getUsers();
    });
  }

  ngOnInit(): void {
    this.getUsers();

  }

  getUsers(): void {
    this.userservices.getUsers().subscribe(
      res => {
        this.users = res;
       // console.log(this.users);
        this.dataSource = new MatTableDataSource<IUsers>(this.users);
        this.dataSource.paginator = this.paginator;

          const array = res.map(item => {
            return {
              $key: item.key,
              ...item.payload
            };
          });
          this.listData = new MatTableDataSource(array);
          this.listData.sort = this.sort;
          this.listData.paginator = this.paginator;
          this.listData.filterPredicate = (data, filter) => {
            return this.displayedColumns.some(ele => {
              // tslint:disable-next-line:triple-equals
              return ele != 'actions' && data[ele].toLowerCase().indexOf(filter) != -1;
            });
          };
      },
      err =>  {
        console.error(err);
      }
      );
    }

    onSearchClear(): any {
      this.searchKey = '';
      this.applyFilter();
    }
    applyFilter(): any {
      this.listData.filter = this.searchKey.trim().toLowerCase();
    }

    updatetUser(row: any): void {
      console.log(row);

        // this.userservices.populateForm(row);
        // const dialogConfig = new MatDialogConfig();
        // dialogConfig.disableClose = true;
        // dialogConfig.autoFocus = true;
        // dialogConfig.width = '40%';
        // const dialogRef = this.dialog.open(UsersDataComponent, dialogConfig);

      // dialogRef.afterClosed().subscribe(result => {
      //  // console.log('The dialog was closed');
      //   // this.animal = result;
      //   this.getUsers();
      // });
    }
}
