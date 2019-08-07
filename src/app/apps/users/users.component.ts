import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatDialog, MatDialogConfig, MatSort, MatSnackBar } from '@angular/material';
import { UserService } from './user.service';
import { IUser } from '../../models/user';
import { UsersDataComponent } from './users-data/users-data.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  listData: MatTableDataSource<any>;
  users: IUser[] = [];
  displayedColumns: string[] = ['fullName', 'idCard', 'username', 'email', 'cellPhone', 'speciality', 'userType', 'actions'];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searchKey: string;

  constructor(
    private userservices: UserService,
     public dialog: MatDialog,
     private matSnackBar: MatSnackBar
     ) { }

  // material dialog
  openDialog(data: any = {}): void {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';

    dialogConfig.data = data ? data : undefined;

    const dialogRef = this.dialog.open(UsersDataComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
     // console.log('The dialog was closed');
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
      // console.log(res);
        this.dataSource = new MatTableDataSource<IUser>(this.users);
        this.dataSource.paginator = this.paginator;
        
      },
      err =>  {
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
        this.userservices.changeStatus(isActive, id).subscribe(
          res => {
            this.matSnackBar.open('Usuario deshabilitado con exito', '', {
              duration: 3000
            });
            this.getUsers();
          },
          err => {
            this.matSnackBar.open('Error al deshabilitar Usuario ', '', {
              duration: 3000
            });
            console.error(err);
          }
        );
    }


}
