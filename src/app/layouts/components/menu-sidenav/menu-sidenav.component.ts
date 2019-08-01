// tslint:disable-next-line:rxjs-no-wholesale
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { Component, OnDestroy, Input, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LoginService } from '../../../auth/login.service';
<<<<<<< HEAD
import { SwalPartialTargets, SwalComponent } from '@sweetalert2/ngx-sweetalert2';
=======
import Swal from 'sweetalert2';

>>>>>>> 14c0b8896c80d28ab96ffaa38c21da12a12b7ac8
@Component({
  selector: 'portal-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
})
export class MenuSidenavComponent implements OnDestroy {
  /**
   * Import material sidenav so we can access open close functions.
   */
  @ViewChild('deleteSwal') private deleteSwal: SwalComponent;
  @Input() sidenav: MatSidenav;
  routerSubscription: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,


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

  ngOnDestroy(): void {
    this.routerSubscription.unsubscribe();
  }
  onLogut(): void {
    this.loginService.deleteToken();
    this.router.navigateByUrl('/external/login');
  }
  /*showModal(): void {
    Swal.fire({
      title: 'ClinicalSoft',
      text: 'Esta seguro que desea salir?',
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Cerrar session!',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      reverseButtons: true
    });
  }*/

}
