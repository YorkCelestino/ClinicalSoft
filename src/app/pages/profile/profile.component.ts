import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../auth/login.service';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;
  passwordForm: FormGroup;
  notificationsForm: FormGroup;
  userProfile: any = [];
  constructor(private fb: FormBuilder, private snackBar: MatSnackBar, private loginService: LoginService) {

    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required]
    });



  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.getProfile();
    this.profileForm = this.fb.group({
      _id: this.userProfile.id,
      fullName: this.userProfile.fullName,
      email: this.userProfile.email,
     // role: this.userProfile.role.id

    });

   }

  setForm(): void {}

  showSnackbar(): void {
    this.snackBar.open('Settings Updated', '', {
      duration: 3000,
    });

  }

  getProfile(): void {
    this.loginService.getUserProfile().subscribe(
      res => {

        this.userProfile = res;
        console.log(res);
      },
      err => {console.error(err);
      }
    );
  }
}
