import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../auth/login.service';
import { IUser } from '../../../models/user';

@Component({
  selector: 'portal-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {
  // public userProfile: Array<any> | Array<IUser>;
  public userProfile: any = [];
  constructor(
    private loginService: LoginService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void {
      this.loginService.getUserProfile().subscribe(
        next => {
          this.userProfile = next;
         // console.log(this.userProfile);
        },
       err => console.error(err)
      );
  }

  onLogut(): void {
      this.loginService.deleteToken();
      this.router.navigateByUrl('/external/login');
  }

}
