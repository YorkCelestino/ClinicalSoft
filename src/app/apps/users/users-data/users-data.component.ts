import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersComponent } from '../users.component';
import { IRole } from '../roles.inferface';

@Component({
  selector: 'app-users-data',
  templateUrl: './users-data.component.html',
  styleUrls: ['./users-data.component.scss']
})
export class UsersDataComponent implements OnInit {

  public form: FormGroup;
  public roles: Array<IRole>;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UsersDataComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
    ) {

    this.getRoles();
    this.setForm();
  }

  private getRoles(): void {
    this.userService.getRoles().subscribe(
      next => {
       // console.log(next);
        this.roles = next;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit(): void {
  }

  setForm(): any {
   // console.log(this.data.fullName);
     if (this.data.id) {
     //  console.log (this.data);
        this.form = this.fb.group({

        _id: [this.data.id, Validators.required],
        fullName: [this.data.fullName, Validators.required],
        idCard: [this.data.idCard, Validators.required],
        username: [this.data.username, Validators.required],
        password: [this.data.password, Validators.required],
        email: [this.data.email, Validators.required],
        cellPhone: [this.data.cellPhone, Validators.required],
        speciality: [this.data.speciality, Validators.required],
        role: this.data.role.id,
        isDelete: false

        });
    } else {
      this.form = this.fb.group({
        _id: null,
        fullName: ['', Validators.required],
        idCard: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        cellPhone: ['', Validators.required],
        speciality: ['', Validators.required],
        role: '5d366597d964920f1c00659d',
        isDelete: false
      });
    }

   }

  addUser(): void {

    if (this.form.valid) {


      if (this.data.id) {
         // update User
         console.log('update User');
         console.log(this.form.value);

         this.userService.updateUser(this.form.value).subscribe(
          res => console.log(res),
          err => console.error(err)
        );

      } else {
         // adding User
         console.log('adding User');
         console.log(this.form.value);

         this.userService.addUser(this.form.value).subscribe(
          res => console.log(res),
          err => console.error(err)
        );

      }

      this.closeDialog();
    }
  }

  closeDialog(): void {
    this.form.reset();
    this.dialogRef.close();
  }

}
