import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { LoginService } from '../../auth/login.service';
// tslint:disable-next-line:rxjs-no-wholesale
import {  Subject } from 'rxjs';

@Component({
  selector: 'portal-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  wrong: boolean = false;
  loginForm: FormGroup;
  private subject: Subject<any> = new Subject<any>();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
  ) { }
  model: any = {
    usermane: '',
    password: ''
  };
  // tslint:disable-next-line:max-line-length
  emailRegex: any = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.required],
      'password': ['', Validators.required]
    });

    if (this.loginService.isloggedIn()) {
      this.router.navigate(['/dashboards/analytics']);
    }

  }

  // tslint:disable-next-line:typedef
  onSubmit(form: NgForm) {
    this.loginService.login(form.value).subscribe(
      res => {

       // console.log(this.loginService.login(form.value));
       this.wrong = false;
        this.loginService.setToken(res['token']);
        this.router.navigateByUrl('/dashboards/analytics');
      },
      err => {
        this.serverErrorMessages = err.error.message;
        this.wrong = true;

      }
    );
    // this.router.navigateByUrl('/atencion');
  }

  // login(): void {
  //   this.router.navigate(['']);
  // }

  register(): void {
    this.router.navigate(['/external/register']);
  }

  forgotPassword(): void {
    this.router.navigate(['/external/forgot-password']);
  }

}
