import { NgModule } from '@angular/core';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconRegistry } from '@angular/material';

import { AppRoutingModule } from './app-routing.module';
import { LayoutsModule } from './layouts/layouts.module';

import { AppComponent } from './app.component';

import 'hammerjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';


// servicios
import { UserService } from './apps/users/user.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { LoginService } from './auth/login.service';
import { AuthGuard } from './auth/auth.guard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    LayoutsModule,
    AppRoutingModule,
   
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
  })
 
  ],
 /* providers: [
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard ,
    LoginService
  ],*/
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }, AuthGuard, LoginService],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  constructor(
      private matIconRegistry: MatIconRegistry,
      private sanitizer: DomSanitizer
    ) {
    // Register Font Awesome
    matIconRegistry.registerFontClassAlias('fontawesome', 'fa');

    // Register layout icon SVGs
    matIconRegistry.addSvgIcon('classic',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/classic.svg')
    );
    matIconRegistry.addSvgIcon('toolbar',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/toolbar.svg')
    );
    matIconRegistry.addSvgIcon('compact',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/compact.svg')
    );
    matIconRegistry.addSvgIcon('boxed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/boxed.svg')
    );
    matIconRegistry.addSvgIcon('funky',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/funky.svg')
    );
    matIconRegistry.addSvgIcon('tabbed',
      sanitizer.bypassSecurityTrustResourceUrl('assets/images/icons/tabbed.svg')
    );
  }
}
