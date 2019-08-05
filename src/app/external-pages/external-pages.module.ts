import { NgModule } from '@angular/core';

import { SharedModule } from './../shared/shared.module';

import { routing } from './external-pages-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { Error404Component } from './error-404/error-404.component';
import { Error500Component } from './error-500/error-500.component';
import { LockComponent } from './lock/lock.component';

import { AuthInterceptor } from '../auth/auth.interceptor';
import {  HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';
import { LoginService } from '../auth/login.service';
import { RecordDataComponent } from './record-data/record-data.component';


@NgModule({
  imports: [
    routing,
    SharedModule
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    Error404Component,
    Error500Component,
    LockComponent,
    RecordDataComponent,
  ],
  exports: [
    LoginComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true

    },
    AuthGuard,
    LoginService
  ]
})
export class ExternalPagesModule { }
