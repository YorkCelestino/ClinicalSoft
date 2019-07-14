import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialogRef } from '@angular/material';
import { UsersComponent } from '../users.component';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent implements OnInit {

  public form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UsersDataComponent>
    ) {
    // this.setForm();
  }

  ngOnInit(): void {

  }

  addUser(): void {
    console.log(this.userService.form.value);

    if (this.userService.form.valid) {
      if (!this.userService.form.get('$key').value) {

        // adding User
        this.userService.addUser(this.userService.form.value).subscribe(
          res => console.log(res),
          err => console.error(err)
        );

      } else {
        // update User
        this.userService.updateUser(this.userService.form.value).subscribe(
          res => console.log(res),
          err => console.error(err)
        );
      }

      this.userService.form.reset();
      this.userService.initializeFormGroup();
      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.userService.form.reset();
    this.userService.initializeFormGroup();
    this.dialogRef.close();
  }
  setForm(): void {

      /*this.form =  this.fb.group({
        fullName: ['', Validators.required],
        idCard: ['', Validators.required],
        username:  ['', Validators.required],
        password: ['', Validators.required],
        email:  ['', Validators.required],
        cellPhone:  ['', Validators.required],
        speciality:  ['', Validators.required],
        userType:  ['', Validators.required]
      });*/
    }

}
