// tslint:disable-next-line:import-destructuring-spacing
import {Component, OnInit, ViewChild} from '@angular/core';
// tslint:disable-next-line:import-destructuring-spacing
import {MatPaginator} from '@angular/material/paginator';
// tslint:disable-next-line:import-destructuring-spacing
import {MatTableDataSource} from '@angular/material/table';
import { UserService } from './../../services/user.service';
import { IUsers } from '../../models/user';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any = [];
  displayedColumns: string[] = ['fullName', 'idCard', 'username', 'email', 'cellPhone', 'speciality', 'userType', 'actions'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private userservices: UserService) { }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.getUsers();
  }
  getUsers(): void {
    this.userservices.getUsers().subscribe(
      res => {
        this.users = res;
       // console.log(this.users);
        this.dataSource = new MatTableDataSource<IUsers>(this.users);
        this.dataSource.paginator = this.paginator;
      },
      err =>  {
        console.error(err);
      }
      );
    }
  addUser(): void {}
  updateUser(): void {}

}
