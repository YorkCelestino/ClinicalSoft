import { Component, OnInit } from '@angular/core';
// tslint:disable-next-line:rxjs-no-wholesale
import { Subscription, timer, BehaviorSubject } from 'rxjs';

import { LayoutService } from '../../layouts/layout.service';
import { UserService } from '../../apps/users/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  doctors: any = [];
  available: number;
  constructor(public layoutService: LayoutService, private uerService: UserService) { }

  ngOnInit(): void  {
    this.getUsers();
  }

  getUsers(): any {
    this.uerService.getDoctors().subscribe(
      res => {
        this.doctors = res;
        this.available = this.doctors.length;
      },
      err => console.error(err)
    );
  }

}
