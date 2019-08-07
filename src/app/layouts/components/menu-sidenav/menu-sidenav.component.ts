// tslint:disable-next-line:rxjs-no-wholesale
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { Component, OnDestroy, Input, ViewChild, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LoginService } from '../../../auth/login.service';
import { IUser } from '../../../models/user';
import { UserService } from '../../../apps/users/user.service';

@Component({
  selector: 'portal-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
})
export class MenuSidenavComponent implements OnDestroy, OnInit {

  /**
   * Import material sidenav so we can access open close functions.
   */

  @Input() sidenav: MatSidenav;
  routerSubscription: Subscription;
  user: any = [];
  userPopulateRole: any = [];
  role: any = [];

  constructor(
    private router: Router,
    private loginService: LoginService,
    private userService: UserService


    ) {
    this.routerSubscription = this.router.events
      .pipe(
        filter(event => event instanceof NavigationStart),
      )
      .subscribe((event: RouterEvent) => {
        if (this.sidenav && this.sidenav.mode === 'over' && this.sidenav.opened) {
          this.sidenav.close();
        }
      });
  }

  ngOnInit(): void {
    this.getRole();
    this.getUser();
    this.getUserPopulateRole();
  }
  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
  onLogut(): void {
    this.loginService.deleteToken();
    this.router.navigateByUrl('/external/login');
  }

  // getting role of user

  getRole(): any {
    this.userService.getRole().subscribe(
      res => {
        this.role = res;
      },
      err => {
        console.error(err);
      }
    );
  }

// getting user loged
  getUser(): any {
    this.loginService.getUserProfile().subscribe(
      res => {
       this.user = res;
      },
      err => {
        console.error(err);
      }
    );
  }

  // getting user loged PopulateRole
  getUserPopulateRole(): any {
    this.loginService.getUser().subscribe(
      res => {
       this.userPopulateRole = res;
      },
      err => {
        console.error(err);
      }
    );
  }


}
