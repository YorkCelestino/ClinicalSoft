import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, Validator } from '@angular/forms';
import { UserService } from '../user.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { IRole } from '../roles.inferface';
import { IUser } from '../../../models/user';

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
    @Optional() @Inject(MAT_DIALOG_DATA) public data: IUser,
    private matSnackBar: MatSnackBar
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

        id: [this.data.id, Validators.required],
        fullName: [this.data.fullName, Validators.required],
        idCard: [this.data.idCard, Validators.required],
        username: [this.data.username, Validators.required],
        password: [this.data.password, Validators.required],
        email: [this.data.email, Validators.required],
        cellPhone: [this.data.cellPhone, Validators.required],
        speciality: [this.data.speciality, Validators.required],
        role: this.data.role.id,
        isActive:  this.data.isActive

        });
    } else {
      this.form = this.fb.group({
        id: null,
        fullName: ['', Validators.required],
        idCard: ['', Validators.required],
        username: ['', Validators.required],
        password: ['', Validators.required],
        email: ['', Validators.required],
        cellPhone: ['', Validators.required],
        speciality: ['', Validators.required],
        role: '5d366597d964920f1c00659d',
        isActive: true
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
          res => {
            this.matSnackBar.open('Usuario actualizado con exito ', '', {
              duration: 3000,
            });
          },
          err => {
            this.matSnackBar.open('Error al actualizar Usuario', '', {
              duration: 3000,
            });
            console.error(err);
          }
        );

      } else {
         // adding User
         this.userService.addUser(this.form.value).subscribe(
          res => {
            this.matSnackBar.open('Usuario registrado con exito ', '', {
              duration: 3000,
            });
          },
          err => {
            this.matSnackBar.open('Error al registrar Paciente ', '', {
              duration: 3000,
            });
            console.error(err);
          }
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
