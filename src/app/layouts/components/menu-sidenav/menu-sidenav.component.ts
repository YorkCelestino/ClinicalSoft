import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { Component, OnDestroy, Input } from '@angular/core';
import { MatSidenav } from '@angular/material';
import { LoginService } from '../../../auth/login.service';
import   Swal   from 'sweetalert2';

@Component({
  selector: 'portal-menu-sidenav',
  templateUrl: './menu-sidenav.component.html',
  styleUrls: ['./menu-sidenav.component.scss'],
})
export class MenuSidenavComponent implements OnDestroy {
  /**
   * Import material sidenav so we can access open close functions.
   */
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
  showModal(): void {
    Swal.fire({
      title: 'ClinicalSoft',
      text: "Esta seguro que desea salir?",
      type: 'warning',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Cerrar session!',
      cancelButtonColor: '#d33',
      showCancelButton: true,
      reverseButtons: true
    });
  }

}
